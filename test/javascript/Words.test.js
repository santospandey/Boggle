import React from "react"
import "../../enzyme.configure"
import { shallow } from "enzyme"

import Words from "../../app/javascript/packs/components/Words"

describe("Testing Words component", ()=>{
    test("it loads no words", ()=>{
        const words = []
        const wrapper = shallow(<Words data={words}/>)
        expect(wrapper.find("ul>li").length).toBe(0)
    })

    test("it loads array of words", ()=>{
        const words = ["The", "Quick", "Fox", "Jumps", "Over", "Lazy", "Dog"]
        const wrapper = shallow(<Words data={words}/>)        
        expect(wrapper.find("ul>li").length).toBe(words.length)
        expect(wrapper.find("ul>li").map(n=>n.text())).toEqual(words)
    })
})