document.getElementById("btnBusqueda").addEventListener("click",(()=>{!async function(t){const e=`https://api.weatherapi.com/v1/current.json?key=8c8a90f7de104e87ab4194550241103&q=${document.getElementById("search-bar").value}`;try{const t=await fetch(e),n=await t.json(),o=await async function(t){const e=`https://restcountries.com/v3.1/name/${t}`,n=await fetch(e);return await n.json()}(n.location.country);!function(t,e,n,o,c,a,d){const r=document.getElementById("error-content"),i=document.getElementById("logo-country"),l=document.getElementById("location"),m=document.getElementById("condition"),u=document.getElementById("degrees"),s=document.getElementById("local-time"),y=document.getElementById("wind"),g=document.getElementById("humidity");r.style.display="none",i.src=t,l.textContent=e,m.textContent=n,u.textContent=o+"°c",s.textContent=""+c.split(" ")[1],y.textContent=a+" kph",g.textContent="% "+d}(o[0].flags.png,n.location.name,n.current.condition.text,n.current.temp_c,n.location.localtime,n.current.wind_kph,n.current.humidity)}catch(t){console.error("Error al obtener los datos del clima:",t)}}()}));