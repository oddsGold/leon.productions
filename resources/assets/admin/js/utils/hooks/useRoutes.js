export default function (basePath = '', routes = {}){

    const addAbsolutePath = (route, rootPath) => {
        if(route.hasOwnProperty('path') && route.path !== '*'){
            route.absolute = rootPath + (route.path.startsWith('/') ? '' : '/') + route.path;
        }
        if(route.hasOwnProperty('children') && Object.keys(route.children).length > 0){
            for(let c in route.children){
                route.children[c] = addAbsolutePath(
                    route.children[c],
                    route.hasOwnProperty('path') ? route.absolute : ''
                );
            }
        }
        return route;
    };

    if(basePath !== ''){
        for(let i in routes){
            if(routes[i].hasOwnProperty('path') && routes[i].path !== '*'){
                routes[i].path = basePath + routes[i].path;
            }
            routes[i] = addAbsolutePath(routes[i], '');
        }
    }
    return routes;
}
