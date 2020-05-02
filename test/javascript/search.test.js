import React from "react"
import "./enzyme.configure"
import { shallow } from "enzyme"

import Search from "../../app/javascript/packs/components/Search"

describe("Testing Search Component", ()=>{
    test("it loads input box", ()=>{        
        const wrapper = shallow(<Search search={()=>{}}/>)
        expect(wrapper.exists("input")).toBe(true);
        expect(wrapper.find("input").text()).toBe("");
    })
    
    test("it calls search function on enter", ()=>{
        let string = ""
        let value = "hello"
        const wrapper = shallow(<Search search={()=>{string = value}}/>)
        wrapper.find("input").simulate("change", {target: {value: value}})
        wrapper.find("input").simulate("keydown", {keyCode: 13})
        expect(string).toBe("hello")
    })
})