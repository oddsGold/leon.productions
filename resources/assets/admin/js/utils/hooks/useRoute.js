
export default function (path, element = null, children = {}, exact = true){

    return {
        path: path,
        exact: exact,
        element: element,
        children: children
    };
}
