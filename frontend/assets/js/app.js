;((window) => {
    'use strict';

    class App {
        constructor(window) {
            const global = window;
        }

        Init() {
            console.info('App is ready.');

            this.independentContent();
            this.dragAndDropHeaders();
            this.dragAndDropBodys('site-body', 'build-body');
        }

        independentContent() {
            const header  = document.getElementsByClassName('header');
            const content = document.getElementsByClassName('content');

            for (let i = 0; i < content.length; i++) {
                content[i].style.height = `calc(100vh - ${header[i].offsetHeight}px)`;
            }
        }

        onDragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);
        }

        onDragOver(event) {
            event.preventDefault();
        }

        onDrop(event) {
            event.preventDefault();

            const id = event.dataTransfer.getData('text');
            const nodeCopy = document.getElementById(id).cloneNode(true);

            nodeCopy.id = 'wip-header';
            nodeCopy.draggable = false;
            event.target.innerHTML = '';

            if (event.target.getAttribute('id') === 'wip-header') {
                event.target.parentElement.appendChild(nodeCopy);
                event.target.remove();
            } else {
                event.target.appendChild(nodeCopy);
            }

            if (event.target.childNodes.length > 0) {
                event.target.classList.add('active');
            }
            
            event.dataTransfer.clearData();
        }

        dragAndDropHeaders() {
            const headers = document.getElementsByClassName('site-header');
            const buildHeaderSection = document.getElementById('build-header');

            for (let i = 0; i < headers.length; i++) {
                headers[i].addEventListener('dragstart', (event) => {
                    this.onDragStart(event);
                });
            }

            buildHeaderSection.addEventListener('drop', (event) => {
                this.onDrop(event);
            });

            buildHeaderSection.addEventListener('dragover', (event) => {
                this.onDragOver(event);
            });
        }

        dragAndDropBodys(bodys, buildBodySection) {
            const _bodys = document.getElementsByClassName(bodys);
            const _buildHeaderSection = document.getElementById(buildBodySection);

            for (let i = 0; i < _bodys.length; i++) {
                _bodys[i].addEventListener('dragstart', (event) => {
                    this.onDragStart(event);
                });
            }

            _buildHeaderSection.addEventListener('drop', (event) => {
                this.onDrop(event);
            });

            _buildHeaderSection.addEventListener('dragover', (event) => {
                this.onDragOver(event);
            });
        }
    };

    document.addEventListener('DOMContentLoaded', (event) => {
        const APP = new App(window);
              APP.Init();
    });
})(window);