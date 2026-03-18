import StorealsoSidebar from "./components/storeAlsoSIdebar";


export default function StorealsoLayout({children}:{children: React.ReactNode}){
         return (
           <div className="flex">
             <div className="flex">
               <StorealsoSidebar />
             </div>
             {children}
           </div>
         );
}