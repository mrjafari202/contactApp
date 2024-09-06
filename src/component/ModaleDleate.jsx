import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';  
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';  

export default function ModaleDleate({ dleateAll, closeModal }) {  
    const handleDelete = () => {  
        dleateAll(); // حذف مخاطبین فقط در اینجا انجام می‌شود  
    };  

    return (  
        <Dialog open onClose={closeModal} className="relative z-10">  
            <DialogBackdrop  
                transition  
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"  
            />  
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">  
                <div className="flex min-h-full items-end justify-center p-4 text-center">  
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">  
                        <div className="bg-white p-4">  
                            <div className="flex justify-end items-center gap-3">  
                                <div className="mt-3 text-right">  
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">  
                                        حذف مخاطبین  
                                    </DialogTitle>  
                                    <div className="mt-2">  
                                        <p className="text-sm text-gray-500">  
                                            آیا از حذف همه مخاطبین اطمینان دارید؟  
                                        </p>  
                                    </div>  
                                </div>  
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">  
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />  
                                </div>  
                            </div>  
                        </div>  
                        <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse gap-3">  
                            <button  
                                type="button"  
                                onClick={handleDelete}  
                                className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"  
                            >  
                                بله مطمئنم  
                            </button>  
                            <button  
                                type="button"  
                                onClick={closeModal}  
                                className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"  
                            >  
                                خیر کنسل کن  
                            </button>  
                        </div>  
                    </DialogPanel>  
                </div>  
            </div>  
        </Dialog>  
    );  
}