(function(){

    check = {
        eventDefined: function(event, fn){
            if(typeof event !== "undefined"){
                fn(event);
                return;
            }
        },
        type: function(object){
            switch(object){
                case "function":
                    if(typeof fn !== "function"){
                        throw "is not function";
                        return;
                    }
                case "string":
                    if(typeof _class !== "string"){
                        throw "class is not string";
                        return;
                    }
                default: 
            }   
        }
    }
    self.on = {
        dragstart: function(_class, fn /* callback */){
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            self.heightCard = __class[0].clientHeight / 2; // optenemos la mitad del heigth card 
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                event = id.addEventListener("dragstart",fn);
            }      

            check.eventDefined(event, fn);
        },
        dragover: function(_class, fn /* callback */){
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                event = id.addEventListener("dragover",fn);
            }    
            check.eventDefined(event, fn);
        },
        drop: function(_class, fn /* callback */){
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                event = id.addEventListener("drop",fn);
            }   
            check.eventDefined(event, fn);
        },
        dragleave: function(_class, fn /* callback */){
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                callbacks = id.addEventListener("dragleave",fn);
            }      
            check.eventDefined(event, fn);
        },
        drag: function(_class, fn /* callback */) {
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                callbacks = id.addEventListener("drag",fn);
            }      
            check.eventDefined(event, fn);
        },
        dragenter: function(_class, fn /* callback */){
            check.type(fn);
            check.type(_class);

            var event;
            var __class = document.getElementsByClassName(_class);
            var i = __class.length -1;
            for(;i>=0; i--){
                var id = document.getElementById(__class[i].id);
                callbacks = id.addEventListener("dragenter",fn);
            }      
            check.eventDefined(event, fn);
        }
    }

    self.Board = function(id, name){
        this.id = id;
        this.name = name;
    }

    self.Target = {

    }

    self.Data = {
        setDatas: function(id, e, key){
            e.dataTransfer.setData(key, id);
        },
        getDatas: function(e, key){
            return e.dataTransfer.getData(key);
        }
    }

    ChangePosition = {
        change: function(width, height, numItems){
            var width = width;
            var height = height;
            var numItems = items;
        }
    }
    self.Functions = {
        drop:{
            finish: function(classMoment, idClassMoment, e){
                var idObject = document.getElementById(Data.getDatas(e, "key_content"));
                idObject.style = "width: 100%; position:initial;" // se agregue o no al Board hay que resetear a los valores iniciales
    
                if(classMoment === "cards" || classMoment !== "card"){ // si la clase es un contenedor agrega la tarjeta, pero si la clase es un card ensima de otro card no ejecuta el if
                    idClassMomentObject = document.getElementById(idClassMoment);
                    idClassMomentObject.appendChild(idObject);
                }             
            }
        },
        setImg: function(pathImg, e){
            var img = new Image();
            img.src = pathImg;
            img.width = 0;
            img.height = 0;
            e.dataTransfer.setDragImage(img, 0, 0);
        },
        drag: {
            move: function(e){
                var id = document.getElementById(idCardOndragstart);
                /* with hacer dinamico */
                id.style="position:absolute;width:262px; left:" + e.clientX+"px;"+ "top:"+ e.clientY+"px;";
            }
        },
        replace: function(node1, node2){
            node1 = document.getElementById(node1);
            node2 = document.getElementById(node2);
            node1.parentNode.replaceChild(node1, node2);
            node1.parentNode.insertBefore(node2, node1);
        }
    }

})();
   
window.onload = function(){
    // configurar variables de tamaño de Board y Card -> pendiente


    on.dragstart("card"/* item class */, function(e /* return */) {
      //  Functions.setImg("js/image2.png", e);
        Data.setDatas(e.target.id, e, "key_content");
        self.idCardOndragstart = e.target.id; // id de tarjeta que se esta moviendo
       
    }); 

    on.dragover("cards" /* content class */, function(e /* return */) {
        var idDiv = document.getElementById(e.target.id).id;
        var divClass = document.getElementById(e.target.id).className;
        Data.setDatas(idDiv, e, "key_id_class");
        self.classMoment = divClass;
        self.idClassMoment = idDiv;

/*
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log("x:"+x+"-"+"y:"+ y);
        */
        e.preventDefault();
    });

     on.dragover("card" /* content class */, function(e /* return */) {
      
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
       // console.log(e);
        console.log("dragstart:"+ idCardOndragstart);
        console.log("taget:"+ e.target.id);
        console.log("height:" +heightCard);
        if(y >= heightCard){
             Functions.replace(e.target.id, idCardOndragstart);
        }
        if(y < heightCard-1){
            Functions.replace(idCardOndragstart, e.target.id);
        }
        console.log("x:"+x+"-"+"y:"+ y);
        e.preventDefault();
    });

    on.drop("cards" /* content class */, function(e /* return */) {
       
        Functions.drop.finish(classMoment, idClassMoment, event);
        
       // console.log("drop");
    });

    on.dragleave("cards" /* content class */, function(e /* return */) {

        e.preventDefault();
    });

    on.drag("card" ,function(e) {

       // console.log("x:" +e.offsetY);
        //Functions.drag.move(e);
       // console.log("drag");
    });

    on.dragenter("card" ,function(e) {
    
       
        console.log("dragenter");
    });
}