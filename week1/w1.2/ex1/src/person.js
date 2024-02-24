"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(_name, _age, _gender) {
        this._name = _name;
        this._age = _age;
        this._gender = _gender;
        this.name = _name;
        this.age = _age;
        this.gender = _gender;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.getGender = function () {
        return this.gender;
    };
    return Person;
}());
exports.Person = Person;
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 0] = "MALE";
    Gender[Gender["FEMALE"] = 1] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
