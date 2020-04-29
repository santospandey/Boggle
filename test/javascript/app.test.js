import React from 'react';
import ReactDOM from 'react-dom';

import App from '../../app/javascript/packs/components/App'

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("App testing", ()=>{
    test('Load App', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe('Hello world3');        
    });    
})

  