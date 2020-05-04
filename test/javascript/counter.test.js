import React from "react"
import "../../enzyme.configure"
import { shallow } from "enzyme"

import Counter from "../../app/javascript/packs/components/Counter"

describe("Testing Counter component", ()=>{
    test("it loads counter with count value", ()=>{
        const count = 5
        const wrapper = shallow(<Counter count={count}/>)
        expect(wrapper.find("strong").text()).toBe(count.toString())
    })
})