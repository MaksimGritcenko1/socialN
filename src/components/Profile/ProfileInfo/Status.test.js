import React from "react";
import {create} from "react-test-renderer";
import Status from "./Status";


describe("Status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<Status status={'New status here'}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('New status here');
    });
});