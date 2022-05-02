

const config = require('../config');
const util = require('../helpers/util');
const model = require('../models/messages')

module.exports = function Chat(io) {
    const createMsgObj = ({ user, roomId, staff }) => {
        return {
            user,
            roomId,
            staff,
            updatedAt: new Date()
        }
    }
    const getCurrentUser = async (socket) => {
        let user = null
        if (socket.handshake.query && socket.handshake.query.token) {
            let replaceToken = socket.handshake.query.token.replace('Bearer ', '')
            try {
                user = await util.JWTverify(replaceToken)
                
            } catch (ex) {
                console.log(ex)
            }
        }
        //guest
        if (!user) {
            user = {
                id: socket.id,
                firstName: 'Guest',
                room: socket.id,
                avatar: config.DEFAULT_IMAGE
            }
        }

        return user

    }

    const assignRoom = async (socket, user) => {

        let roomId = socket.handshake.query.roomId

        if (roomId&&roomId!='undefined') {
            socket.join(roomId)
        } else if (user.role == "staff") {
            let message = await model.getFirstAvailableMessage({ staff: null })
            if (message) {
                roomId = message.roomId
                message.staff = user
                socket.join(roomId)
                
                io.to(roomId).emit('onStaffJoin', user.firstName);
                await model.update(roomId, message)
                
            }
            
            
        }
        else {

            roomId = await model.getNextRoomID()
            roomId = roomId.toString()
            socket.join(roomId);
            await model.add(createMsgObj({ user: user, roomId: roomId, staff: null }))
            

            
        }
        
        socket.emit('getRoom', roomId) 
     
    }





    io.on('connection', async (socket) => {
        let user = await getCurrentUser(socket)
        let getPendingUsersCount = await model.getAllPendingCount({ staff: null })


        socket.emit('getPendingUsers', getPendingUsersCount)

        //assign room , staff will assign the first pending room 
        assignRoom(socket, user)

        socket.on('guestMsg', async ({ roomId, msg }) => {
            let user = await model.getUserByRoomId(roomId)

            const { id, firstName, avatarUrl } = user
            let data = {
                id: id,
                firstName: firstName,
                avatar: avatarUrl,
                msg: msg
            }

            io.to(roomId).emit('getGuest', data);
        })

        socket.on('staffMsg', async ({ roomId, msg }) => {
            let user = await model.getStaffByRoomId(roomId)

            const { id, firstName, avatarUrl } = user
            let data = {
                id: id,
                firstName: firstName,
                avatar: avatarUrl,
                msg: msg
            }

            io.to(roomId).emit('getStaff', data);
        })

        socket.on('clientDisconnect', async ({ roomId }) => {
            // io.to(roomId).emit('getRoom', 1);
            
            let user = await model.getUserByRoomId(roomId)
            if(user){
                let msg = user.firstName + ' just left the chat'
                io.to(roomId).emit('exitClientUser', msg);
            }
            socket.leave(roomId);
            socket.leave(socket.id);


        })

        socket.on('staffDisconnect', async ({ roomId }) => {
            // io.to(roomId).emit('getRoom', 1);
            let user = await model.getStaffByRoomId(roomId)
            if(user){
                let msg = user.firstName + ' just left the chat'
                io.to(roomId).emit('exitStaffUser', msg);
            }
           
            socket.leave(roomId);
            socket.leave(socket.id);

        })

        socket.on('disconnect', () => {
            
            socket.leave(socket.id);

        });


        //End ON Events
    });





}