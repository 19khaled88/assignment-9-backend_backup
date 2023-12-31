# assignment-9-backend


# used libraries/framworks/databases
## >Prisma, Typescript, Postgresql, Express


# Credentials
### for admin: user name is admin@gmail.com and password: 12345678
### for super admin: user name is super-admin@gmail.com and password: 12345678
### normal user1: user name is user1@gmail.com and password: 12345678
### normal user2: user name is user2@gmail.com and password: 12345678



## Routes 
# user routes 
1. router.get('/single/:id', UserController.getSingleUserController)
2. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), UserController.deleteUserControler)
3. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), UserController.updateUserController)
4. router.post('/signUp',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN),validateRequest(UserValidation.create), UserController.   signUpController)
5. router.post('/signIn', UserController.signInController)
6. router.get('/allUsers',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN),UserController.getAllUsersController)

# turf routes
1. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), TurfController.deleteTurfControler)
2. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), TurfController.updateTurfController)
3. router.get('/single/:id', TurfController.getSingleTurfController)
4. router.post('/create', authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN),validateRequest(TurfValidation.create), TurfController.createController)
5. router.get('/allTurfs', TurfController.getAllTurfsController)
# fields routes
1. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), FieldController.deleteFieldController)
2. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), FieldController.updateFieldController)
3. router.get('/single/:id', FieldController.getSingleFieldController)
4. router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), validateRequest(FieldValidation.create), FieldController.createController)
5. router.get('/allFields', FieldController.getAllFieldController)

# game offers routes
1. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameOfferController.deleteGameOfferController)
2. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameOfferController.updateGameOfferController)
3. router.get('/single/:id', GameOfferController.getSingleGameOfferController)
4. router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), validateRequest(GameOfferValidation.create), GameOfferController.createController)
5. router.get('/allOfferdGames', GameOfferController.getAllGameOfferController)
# game types routes
1. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameTypeController.deleteGameTypeControler)
2. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameTypeController.updateGameTypeController)
3. router.get('/single/:id', GameTypeController.getSingleGameTypeController)
4. router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN),validateRequest(GameTypeValidation.create), GameTypeController.createController)
5. router.get('/allGameTypes', GameTypeController.getAllGameTypeController)
# bookings routes
1. router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), BookingController.deleteBookingController)
2. router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), BookingController.updateBookingController)
3. router.get('/single/:id', BookingController.getSingleBookingController)
4. router.post('/create', validateRequest(BookingValidation.create), BookingController.createBookingController)
5. router.get('/allBookings',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), BookingController.getAllBookingsController)
# payment routes
1. router.delete('/delete/:id', PaymentController.deletePaymentController)
2. router.put('/update/:id', PaymentController.updatePaymentController)
3. router.get('/single/:id', PaymentController.getSinglePaymentController)
4. router.post('/create', validateRequest(PaymentValidation.create), PaymentController.createController)
5. router.get('/allPayments',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), PaymentController.getAllPaymentController)
