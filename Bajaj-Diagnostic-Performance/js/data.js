function All_India_View_Classification_Dtls(){
let data123=[];
data123.push({
Potential: "1260990.4625164447",
Sales: "777269.6599999998",
GAP: "483720.80251644494",
Penetration: "61.6396145018316",
Classification: "LONG LIFE"
});

data123.push({
Potential: "1.2976078922213231E8",
Sales: "8.907363769299996E7",
GAP: "4.068715152913235E7",
Penetration: "68.64449440155481",
Classification: "PERIODIC MAINT"
});

data123.push({
Potential: "1.2843828775275645E8",
Sales: "8.127357596799988E7",
GAP: "4.716471178475657E7",
Penetration: "63.27830850910394",
Classification: "WEAR & TEAR"
});

data123.push({
Potential: "6.053518206550307E7",
Sales: "2.358399848000001E7",
GAP: "3.695118358550306E7",
Penetration: "38.959160070718156",
Classification: "OTHERS"
});

return data123;
}



function All_India_View_Category_Dtls(classificationFilterVal){
        let data123=[];

        if(classificationFilterVal.includes("LONG LIFE")){
        data123.push({
        Potential: "1260990.4625164447",
        Sales: "777269.6599999998",
        GAP: "483720.80251644494",
        Penetration: "61.6396145018316",
        Classification: "ARM ROCKER"
        });
        
        data123.push({
        Potential: "1.2976078922213231E8",
        Sales: "8.907363769299996E7",
        GAP: "4.068715152913235E7",
        Penetration: "68.64449440155481",
        Classification: "BEARING"
        });
        
        data123.push({
        Potential: "1.2843828775275645E8",
        Sales: "8.127357596799988E7",
        GAP: "4.716471178475657E7",
        Penetration: "63.27830850910394",
        Classification: "BLOCK PISTON KIT"
        });
        
        data123.push({
        Potential: "6.053518206550307E7",
        Sales: "2.358399848000001E7",
        GAP: "3.695118358550306E7",
        Penetration: "38.959160070718156",
        Classification: "CARBURETTOR"
        });
    }
      //  ------
 
      if(classificationFilterVal.includes("WEAR & TEAR")){
      data123.push({
        Potential: "190.4625164447",
        Sales: "729.6599999998",
        GAP: "40.80251644494",
        Penetration: "69.6396145018316",
        Classification: "KIT GEAR"
        });
        
        data123.push({
        Potential: "17.2976078922213231E8",
        Sales: "87.907363769299996E7",
        GAP: "4.068715152913235E7",
        Penetration: "66.64449440155481",
        Classification: "KIT CLUTCH PLATE"
        });
        
        data123.push({
        Potential: "17.2843828775275645E8",
        Sales: "32.127357596799988E7",
        GAP: "12.716471178475657E7",
        Penetration: "91.27830850910394",
        Classification: "GASKET CYLINDER HEAD"
        });
        
        data123.push({
        Potential: "6.053518206550307E7",
        Sales: "212.358399848000001E7",
        GAP: "33.695118358550306E7",
        Penetration: "378.959160070718156",
        Classification: "CABLE ACCELERATOR"
        });

    }
        return data123;
        }

