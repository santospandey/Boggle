import React from "react"
import "../../enzyme.configure"
import { mount } from "enzyme"

import Board from "../../app/javascript/packs/components/Board"

describe("Testing Board component", () => {
    test("create a board from the data passed", () => {
        const fakeData = [
            [
                {
                    character: 'A',
                    selected: false
                },
                {
                    character: 'B',
                    selected: false
                }
            ],
            [
                {
                    character: 'C',
                    selected: false
                },
                {
                    character: 'D',
                    selected: true
                }
            ]
        ]

        const css = {
            selectedBg: "#287328",
            background: "#4CAF50"
        }
        const wrapper = mount(<Board data={fakeData} css={css} />)        
        const arr = fakeData.map(d=>d.map(e=>e.character)).flat()
        const elements = wrapper.find("span")
        expect(elements.map(d=>d.text())).toEqual(arr)
        expect((elements.at(0)).prop("style")).toHaveProperty("background", css.background)
        expect((elements.at(1)).prop("style")).toHaveProperty("background", css.background)
        expect((elements.at(2)).prop("style")).toHaveProperty("background", css.background)
        expect((elements.at(3)).prop("style")).toHaveProperty("background", css.selectedBg)
    })
})