import React from "react"
import "../../enzyme.configure"
import { shallow } from "enzyme"

import Timer from "../../app/javascript/packs/components/Timer"

describe("Testing Timer component", () => {
    it("should load start button conditionally", () => {
        let wrapper = shallow(<Timer display={false}/>)
        expect(wrapper.find("button").length).toBe(0)

        wrapper = shallow(<Timer display={true}/>)
        expect(wrapper.find("button").length).toBe(1)
    })

    it("should execute function on clicking start button", ()=>{
        let clicked = false
        let wrapper = shallow(<Timer display={true} start={()=>{clicked = true}}/>)
        expect(wrapper.find("button").length).toBe(1)
        wrapper.find("button").simulate("click")        
        expect(clicked).toBe(true)
    })

    it("should change the time if we click start button", ()=>{
        let wrapper = shallow(<Timer display={true} start={()=>{}}/>)
        expect(wrapper.find("h3").length).toBe(0)
        wrapper.find("button").simulate("click")
        setTimeout(()=>{
            expect(wrapper.find("h3").length).toBe(1)
            const time = wrapper.find("h3").text().split(":")
            expect(time.length==2).toBe(true)            
        }, 2000)
    })
})