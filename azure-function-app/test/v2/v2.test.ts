import { RequestValidator } from "@vjeko.com/azure-func";
import { Mock } from "@vjeko.com/azure-func-test";
import { injectValidators } from "../../src/functions/v2/injectValidators";

describe("Testing generic features of api/v2", () => {
    it("Fails on validating invalid Range type", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "range": "Range" });
        const request = new Mock.Request("GET", { "range": 3.14 });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid Range specification", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "range": "Range" });
        const request = new Mock.Request("GET", { "range": { from: 1, until: 2 } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Succeeds on validating valid Range type", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "range": "Range" });
        const request = new Mock.Request("GET", { "range": { from: 12, to: 15 } });
        expect(() => validator.validate(request)).not.toThrowError();
    });

    it("Fails on validating invalid ALObjectType type", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ALObjectType": "ALObjectType" });
        const request = new Mock.Request("GET", { "ALObjectType": 3.14 });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid ALObjectType array", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ALObjectType": "ALObjectType[]" });
        const request = new Mock.Request("GET", { "ALObjectType": ["codeunit", "unitcode", "page"] });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Succeeds on validating valid ALObjectType array", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ALObjectType": "ALObjectType[]" });
        const request = new Mock.Request("GET", { "ALObjectType": ["codeunit", "table", "page"] });
        expect(() => validator.validate(request)).not.toThrowError();
    });

    it("Fails on validating invalid ObjectIDs type", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": 3.14 });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid ObjectIDs specification (numbers, apples, oranges)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { codeunit: 1, table: [1, "apple", "orange"] } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid ObjectIDs specification (incorrect ALObjectType 'record')", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { codeunit: [1, 2], record: [1, 2] } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid extended ObjectIDs specification (incorrect ALObjectType 'table_0')", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { codeunit: [1, 2], table_0: [1, 2] } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid extended ObjectIDs specification (incorrect ALObjectType 'codeunit_1')", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { codeunit: [1, 2], codeunit_1: [1, 2] } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Succeeds on validating valid ObjectIDs specification", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { codeunit: [12, 13], table: [15, 16] } });
        expect(() => validator.validate(request)).not.toThrowError();
    });

    it("Succeeds on validating valid extended ObjectIDs specification", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "ObjectIDs": "ObjectIDs" });
        const request = new Mock.Request("GET", { "ObjectIDs": { table_1: [12, 13], tableextension_2: [15, 16], enum_1: [12, 13], enumextension_2: [15, 16] } });
        expect(() => validator.validate(request)).not.toThrowError();
    });

    it("Fails on validating invalid PerAppObjectIDs specification (ObjectIDs present instead)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", { "PerAppObjectIDs": { codeunit: 1, table: [1, "apple", "orange"] } });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid PerAppObjectIDs specification (missing appId property)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", {
            "PerAppObjectIDs": [
                { test: "app1", ids: { codeunit: [1, 2], table: [1, 2] } },
                { mock: "app2", ids: "apple" },
            ],
        });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid PerAppObjectIDs specification (missing ids property)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", {
            "PerAppObjectIDs": [
                { appId: "app1", IDs: { codeunit: [1, 2], table: [1, 2] } },
                { appId: "app2", IDs: "apple" },
            ],
        });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid PerAppObjectIDs specification (invalid single ObjectIDs specification inside)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", {
            "PerAppObjectIDs": [
                { appId: "app1", ids: { codeunit: [1, 2], table: [1, 2] } },
                { appId: "app2", ids: "apple" },
            ],
        });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Fails on validating invalid PerAppObjectIDs specification (invalid ALObjectType inside)", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", {
            "PerAppObjectIDs": [
                { appId: "app1", ids: { codeunit: [1, 2], table: [1, 2] } },
                { appId: "app2", ids: { codeunit: [1, 2], record: [1, 2] } },
            ],
        });
        expect(() => validator.validate(request)).toThrowError();
    });

    it("Succeeds on validating valid PerAppObjectIDs specification", () => {
        injectValidators();
        const validator = new RequestValidator();
        validator.expect("body", { "PerAppObjectIDs": "PerAppObjectIDs" });
        const request = new Mock.Request("GET", {
            "PerAppObjectIDs": [
                { appId: "app1", ids: { codeunit: [1, 2], table: [1, 2] } },
                { appId: "app2", ids: { codeunit: [1, 2], page: [1, 2] } },
            ],
        });
        expect(() => validator.validate(request)).not.toThrowError();
    });
});
