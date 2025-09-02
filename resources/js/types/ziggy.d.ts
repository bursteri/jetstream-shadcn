declare global {
    function route(name: string, params?: any, absolute?: boolean): string;
    
    interface Window {
        route: typeof route;
    }
}

export {};