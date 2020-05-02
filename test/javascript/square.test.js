import React from "react"
import "./enzyme.configure"
import { shallow } from "enzyme"

import Square from "../../app/javascript/packs/components/Square"

describe("Square Component Testing", ()=>{
    test("Loads square", ()=>{
        const data = {
            character: 'A',
            background: "#9fee1a"
        }
        const wrapper = shallow(<Square data={data}/>)
        const element = wrapper.find('span')
        expect(element.text()).toContain('A')
        expect(element.prop('style')).toHaveProperty("background","#9fee1a")
    })
})