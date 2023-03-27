import React  from 'react';
import { Component } from "react";

export class Notification extends Component<{ text: string }> {
    constructor(props: {text: string}) {
        super(props);
    }

    render() {
        const text = this.props.text;
        return <div id="toast-success"
                    className="fixed bottom-1 right-1 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert">
            <div
                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-green-700 rounded-lg dark:bg-green-800 dark:text-green-200">
                !
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{text}</div>
        </div>
    };
}


