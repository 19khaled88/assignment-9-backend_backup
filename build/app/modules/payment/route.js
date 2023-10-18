"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../../middleware/validationMiddleware"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const authCheck_1 = __importDefault(require("../../middleware/authCheck"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.delete('/delete/:id', controller_1.PaymentController.deletePaymentController);
router.put('/update/:id', controller_1.PaymentController.updatePaymentController);
router.get('/single/:id', controller_1.PaymentController.getSinglePaymentController);
router.post('/create', (0, validationMiddleware_1.default)(validation_1.PaymentValidation.create), controller_1.PaymentController.createController);
router.get('/allPayments', (0, authCheck_1.default)(client_1.RoleEnumType.ADMIN, client_1.RoleEnumType.SUPER_ADMIN), controller_1.PaymentController.getAllPaymentController);
exports.PaymentRouter = router;
