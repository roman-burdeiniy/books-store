/**
 * Created by roman_b on 3/2/2017.
 */
export default class RouteRegistrator{
    constructor(pathMaps){
        this.pathMaps = pathMaps;
        this.routerMap = (router) => ({
            'GET': router.get.bind(router),
            'POST': router.post.bind(router)
        })
    }

    register(router){
        this.pathMaps.forEach(descriptor => this.addHandler(this.routerMap(router))(descriptor))
    }

    addHandler(routerMap){
        return function(descriptor){
            routerMap[descriptor.type](descriptor.path, (req, res, next) => {
                descriptor.handler.call(this, req).then(result =>{
                    descriptor.success(res, result);
                }).catch(err => {
                    descriptor.error(res, err);
                })
            })
        }
    }
}