"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
const entity_1 = require("../tickets/entity");
const entity_2 = require("../users/entity");
let Event = class Event extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(2, 300),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    class_validator_1.IsUrl(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Event.prototype, "picture", void 0);
__decorate([
    class_validator_1.IsDate(),
    typeorm_1.Column('daterange'),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    typeorm_1.OneToMany(() => entity_1.default, ticket => ticket.event),
    __metadata("design:type", Array)
], Event.prototype, "tickets", void 0);
__decorate([
    typeorm_1.ManyToOne(() => entity_2.default, user => user.events),
    __metadata("design:type", entity_2.default)
], Event.prototype, "user", void 0);
Event = __decorate([
    typeorm_1.Entity()
], Event);
exports.default = Event;
//# sourceMappingURL=entity.js.map