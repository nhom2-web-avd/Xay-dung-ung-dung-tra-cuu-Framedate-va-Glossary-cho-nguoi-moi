export declare class AppController {
    getApiStatus(): {
        status: string;
        message: string;
        version: string;
        timestamp: string;
    };
    getHealthDb(): {
        status: string;
        database: string;
        timestamp: string;
    };
}
