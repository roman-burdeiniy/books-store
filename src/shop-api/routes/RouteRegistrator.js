/**
 * Created by roman_b on 3/2/2017.
 */
export default class RouteRegistrator{
    constructor(pathMaps){
        this.pathMaps = pathMaps;
    }

    register(router){
        this.pathMaps.forEach(descriptor => this.addHandler(router)(descriptor))
    }

    addHandler(router){
        return function(descriptor){
            router.get(descriptor.path, (req, res, next) => {
                descriptor.handler.call(this, req).then(result =>{
                    descriptor.success(res, result);
                }).catch(err => {
                    descriptor.error(res, err);
                })
            })
        }
    }
}