"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOfferRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../../middleware/validationMiddleware"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.delete('/delete/:id', controller_1.GameOfferController.deleteGameOfferController);
router.put('/update/:id', controller_1.GameOfferController.updateGameOfferController);
router.get('/single/:id', controller_1.GameOfferController.getSingleGameOfferController);
router.post('/create', (0, validationMiddleware_1.default)(validation_1.GameOfferValidation.create), controller_1.GameOfferController.createController);
router.get('/allOfferdGames', controller_1.GameOfferController.getAllGameOfferController);
exports.GameOfferRouter = router;
