import React from 'react';

const Console = (props) => {
    return (
        <div className="px-4 pb-4">
            <div className="font-bold text-xl mb-2">Console</div>
            <div className="max-w-2xl rounded overflow-y-auto box-border border-2 border-gray-400 shadow-lg h-64">
                <div className="px-6 py-4 min-h-full">
                    <div className="text-gray-700 text-base">
                        {props.data.map((val, idx) => <div key={idx}>{val}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Console;
