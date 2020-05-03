export class SearchController {
    constructor(n) {
        this.graph = this.generateGraph(n)
    }

    /**
     * Generate graph where n is number of row and column in board 
     * sample look in `GraphData.js`
     * @param {*} n 
     */
    generateGraph(n) {
        let graph = {}
        Array.from(Array(n).keys()).map((i) => {
            return Array.from(Array(n).keys()).map((j) => {
                graph[`${i}${j}`] = this.getNeighbors(i, j, n)
            })
        })
        return graph
    }
    
    getNeighbors(row, col, total) {
        const neighbourMatrix = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        return neighbourMatrix.map((m) => [m[0] + row, m[1] + col]).filter((item) => (((item[0] > -1) && (item[0] < total)) && ((item[1] > -1) && (item[1] < total)))).map((d) => `${d[0]}${d[1]}`)
    }

    getCoordinates(ch, state) {
        let filteredData = []
        for (let i = 0; i < state.data.length; i++) {
            for (let j = 0; j < state.data[i].length; j++) {
                if (state.data[i][j].character === ch) {
                    filteredData.push(`${i}${j}`)
                }
            }
        }

        return filteredData.map((d) => {
            return {
                character: ch,
                fullString: ch,
                coordinate: d,
                coordinateHistory: [d]
            }
        })
    }

    formatCoordinate(coordinateStr) {
        return coordinateStr.split("").map(d => parseInt(d))
    }

    /**
     * Initially put first character info in queue and 
     * scans all the neighbors of queue[i] and check if next character i.e
     * string[i+1] is present in any nodes and also ensure the node is not 
     * repeated by checking its coordinate history.
     * If satisfied then add to queue and continue until cursor reaches queue end 
     * or found searched string.
     */
    search(string, state) {
        let i = 0
        let found = false
        let finalNode = null
        let queue = this.getCoordinates(string[0], state)
        
        while (i < queue.length) {
            let neighbourCoordinates = this.graph[queue[i].coordinate]
            if (neighbourCoordinates.length) {
                let neighboursInfo = neighbourCoordinates.filter((coordinate) => {
                    let [x, y] = this.formatCoordinate(coordinate)
                    let character = state.data[x][y].character
                    let nextChar = string[(queue[i].coordinateHistory).length]
                    return (!(queue[i].coordinateHistory.includes(coordinate))) && (character === nextChar)
                }).map(coordinate => {
                    let [x, y] = this.formatCoordinate(coordinate)
                    let coords = [...queue[i].coordinateHistory, coordinate]
                    let fullString = queue[i].fullString + state.data[x][y].character
                    return {
                        character: state.data[x][y].character,
                        coordinate: coordinate,
                        fullString: fullString,
                        coordinateHistory: coords
                    }
                })

                queue.push(...neighboursInfo)

                for (let node of neighboursInfo) {
                    if (node.fullString === string) {
                        found = true
                        finalNode = node
                    }
                }            
            }

            if(found){break}
            ++i
        }


        let searchResult = {
            coordinateHistory: [],
            string: string,
            found: false
        }
        if (found) {
            searchResult = {
                coordinateHistory: finalNode.coordinateHistory,
                string: finalNode.fullString,
                found: true
            }
        }
        
        return searchResult
    }
}