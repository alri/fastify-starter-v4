
const url = function(link=false,params=false) {
    if(params)
    {
        var items="";
        var newLink="";
        for(const property in params )
        {
            let n = link.includes(property);
            if(n!=0)
            {   
                let value =`${property}/${params[property]}`;
                let str=link.replace(property,value);
                newLink=str;
            }
            else{
               items=items+"/"+params[property];
            }  
        }

        if(newLink){
            newLink=newLink+items
        }
        else{
            newLink=link+newLink+items
        }
        
        return process.env.APP_URL+'/'+newLink;

    }else{
        return process.env.APP_URL+'/'+link;
    }
    
}

const metroCss = function(link=false) {
    return process.env.APP_URL+'/metro-ui/css/'+link;
}

const metroJs = function(link=false) {
    return process.env.APP_URL+'/metro-ui/js/'+link;
};

const bootstrapCss = function(link=false) {
    return process.env.APP_URL+'/bootstrap-ui/css/'+link;
}

const bootstrapJs = function(link=false) {
    return process.env.APP_URL+'/bootstrap-ui/js/'+link;
};

const img = function(link=false) {
    return process.env.APP_URL+'/images/'+link;
};

const public = function(link=false) {
    return process.env.APP_URL+'/'+link;
};


const dist = function(link=false) {
    return process.env.APP_URL+'/dist/'+link;
};

const root = function(){
    return process.env.PWD
}

const test = function(){
    return "Test Helper Work Done !"
}


module.exports = {
    url : url,
    metroCss:metroCss,
    metroJs:metroJs,
    bootstrapCss:bootstrapCss,
    bootstrapJs:bootstrapJs,
    img:img,
    public:public,
    dist:dist,
    root:root,
    test:test
};
