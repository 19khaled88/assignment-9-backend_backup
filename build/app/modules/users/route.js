"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const userRoleValidation_1 = __importDefault(require("../../middleware/userRoleValidation"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/signUp', controller_1.UserController.signUpController);
router.get('/single/:id', controller_1.UserController.getSingleUserController);
router.delete('/delete/:id', controller_1.UserController.deleteUserControler);
router.put('/update/:id', controller_1.UserController.updateUserController);
router.post('/signUp', (0, userRoleValidation_1.default)(validation_1.UserValidation.create), controller_1.UserController.signUpController);
router.post('/signIn', controller_1.UserController.signInController);
router.get('/allUser', controller_1.UserController.getAllUsersController);
exports.UserRouter = router;
