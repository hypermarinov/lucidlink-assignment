## Implementation:

The data type for the matrix chosen is `(number | undefined)[][]`. We also enforce that all the numbers in the matrix must be integers.

The implementation of the solution uses a simple backtracking solution that steps on the DFS algorithm. We iterate over all the cells in the matrix and if we have a number we start a modified depth first search iterate over the orthogonal neighbors that have the same value as the cell we started from. The cells that are visited are persisted not per DFS run but on the matrix iteration level. This is done so we don't count the same group more than once by preventing the algorithm to start the DFS from an already visited (and counted), on a previous DFS iteration, cell. We use `undefined` as the value that splits the group from eachother.
