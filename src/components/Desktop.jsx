
import { apps } from '../apps'
import { Calculator } from '../apps/Claculator/Calculator';

function Desktop(){
    return(
        <div className="w-screen h-screen text-white p-4 bg-[url(https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg)] bg-cover bg-center">
            <div className='absolute top-4 left-4 grid gap-4'>
                { apps.map((app) => (
                    <div 
                        key={app.id} 
                        className='flex flex-col items-center p-2  hover:bg-white/20 rounded cursor-pointer transition-colors'
                        // onClick={}
                    >
                        <div className='p-1'>{app.icon}</div>
                        <span className='text-sm text-white text-center'>{app.title}</span>
                    </div>
                ))}
            </div> 
        </div>
    )
};

export default Desktop;


// 