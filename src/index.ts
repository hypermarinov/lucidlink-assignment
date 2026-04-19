import { CoordinateSet, type Coordinate } from "./types";

const x = {
    x: 1,
    y: 2
};

const y: Coordinate = {
    x: 1,
    y: 2
};


const set = new CoordinateSet();
set.add(x);
if(set.has(y)) {
    console.log('da');
}
