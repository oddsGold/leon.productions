import React, {useEffect, useRef} from 'react';

const runHandlerConfig = {
    interval: null,
    delay: 2000
};

export default function GridDragAndDrop({containerReference, setNewOrderHandler = null}){

    const isDragging = useRef(false);
    const shiftDraggingElement = useRef({x: 0, y: 0});
    const currentDraggingElement = useRef(null);
    const originDraggingElement = useRef(null);
    const originSequence = useRef([]);

    const moveDraggableElementAt = (x, y) => {
        currentDraggingElement.current.style.left = x - shiftDraggingElement.current.x + 'px';
        currentDraggingElement.current.style.top = y - shiftDraggingElement.current.y + 'px';
    };

    const startDraggingHandler = (e) => {

        if(runHandlerConfig.interval !== null){
            clearTimeout(runHandlerConfig.interval);
        }

        isDragging.current = true;
        originDraggingElement.current = e.currentTarget.parentNode;
        const coordinates = originDraggingElement.current.getBoundingClientRect();
        shiftDraggingElement.current.x = e.pageX - (coordinates.left + window.pageXOffset);
        shiftDraggingElement.current.y = e.pageY - (coordinates.top + window.pageYOffset);

        //originSequence.current =
        originDraggingElement.current.classList.add('dragging-origin-item');

        const trWidth = originDraggingElement.current.offsetWidth;
        const table = document.createElement('table');
        table.className = 'table grid current-draggable-item';
        table.style.width = trWidth + 'px';
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        const tr = document.createElement('tr');
        tbody.appendChild(tr)
        for (const originTd of originDraggingElement.current.children) {
            let td = originTd.cloneNode(true);
            td.style.width = originTd.offsetWidth + 'px';
            tr.appendChild(td);
        }
        table.appendChild(tbody);
        currentDraggingElement.current = table;
        document.body.appendChild(currentDraggingElement.current);

        moveDraggableElementAt(e.pageX, e.pageY);


        document.addEventListener('mousemove', mouseMoveHandler);

        currentDraggingElement.current.onmouseup = () => {

            const currentSequence = getCurrentSequence();
            if(!currentSequence.every((value, index) => value === originSequence.current[index])){
                //show save button

                if(runHandlerConfig.interval !== null){
                    clearTimeout(runHandlerConfig.interval)
                }
                runHandlerConfig.interval = setTimeout(() => {
                    clearTimeout(runHandlerConfig.interval);
                    setNewOrderHandler && setNewOrderHandler(currentSequence);
                }, runHandlerConfig.delay);
            }

            document.removeEventListener('mousemove', mouseMoveHandler);
            currentDraggingElement.current.remove();
            currentDraggingElement.current = null;
            originDraggingElement.current.classList.remove('dragging-origin-item')
            originDraggingElement.current = null
            isDragging.current = false;
        };
    };

    const mouseMoveHandler = (e) => {
        const originPosition = originDraggingElement.current.getBoundingClientRect();
        for (const row of containerReference.current.children){
            if(!row.classList.contains('dragging-origin-item')){
                let position = row.getBoundingClientRect();
                if(
                    position.left <= e.pageX && (position.left + row.offsetWidth) > e.pageX &&
                    position.top < e.pageY && (position.top + row.offsetHeight) >= e.pageY
                ){
                    if(originPosition.top > position.top){
                        //direction up
                        containerReference.current.insertBefore(originDraggingElement.current, row);
                    }else{
                        //direction down
                        if(row.nextSibling){
                            containerReference.current.insertBefore(originDraggingElement.current, row.nextSibling);
                        }else{
                            containerReference.current.appendChild(originDraggingElement.current);
                        }
                    }
                }
            }
        }

        moveDraggableElementAt(e.pageX, e.pageY);
    };

    const disabledDefaultDragBehavior = () => {return false;};

    const getCurrentSequence = () => {
        let sequence = [];
        for (const row of containerReference.current.children){
            sequence.push(row.dataset.id);
        }
        return sequence;
    };

    useEffect(() => {
        originSequence.current = getCurrentSequence();
    }, []);

    return <td
            className="draggable-item"
            onMouseDown={startDraggingHandler}
            onDragStart={disabledDefaultDragBehavior}
        >
            <i className="fas fa-grip-vertical" />
        </td>;

}
