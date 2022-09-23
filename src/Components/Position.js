export function Position(dataPoint, center, adjFactor){
        
    const x = dataPoint[0]-center[0];
    const y = dataPoint[1]-center[1];

    return [ -x * adjFactor , y *adjFactor ]
}