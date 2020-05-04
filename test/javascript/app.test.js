import React from 'react';
import "../../enzyme.configure"

import { shallow } from "enzyme"

import App from '../../app/javascript/packs/components/App'
describe("App testing", ()=>{
    test('Load App', () => {
        const wrapper = shallow(<App />);        
        expect(1).toBe(1)
    });    
})
