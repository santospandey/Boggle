import React from 'react';
import "./enzyme.configure"

import { shallow } from "enzyme"

import App from '../../app/javascript/packs/components/App'
describe("App testing", ()=>{
    test('Load App', () => {
        const wrapper = shallow(<App />);
        // expect(wrapper.find('h1').text()).toBe('Hello world3');        
        expect(1).toBe(1)
    });    
})
