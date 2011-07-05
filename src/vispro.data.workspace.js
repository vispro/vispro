vispro.data.workspace = {
    name: 'workspace',
    dependencies: {
        
    },
    properties: {
        name: {
            name: 'name',
            label: 'name',
            type: 'string',
            value: 'workspace',
            writable: false
        },
        label: {
            name: 'label',
            label: 'label',
            type: 'string',
            value: 'Workspace',
            writable: false
        },
        resizable: {
            name: 'resizable',
            label: 'resizable',
            type: 'boolean',
            value: false,
            writable: false
        },
        id: {
            name: 'id',
            label: 'id',
            type: 'string',
            writable: false
        },
        width: {
            name: 'width',
            label: 'width',
            type: 'integer',
            value: 800,
            minimum: 1,
            writable: true
        },
        height: {
            name: 'height',
            label: 'height',
            type: 'integer',
            value: 450,
            minimum: 1,
            writable: true
        },
        color: {
            name: 'color',
            label: 'color',
            type: 'color',
            value: 'rgb(20,20,20)',
            writable: false
        },
        pointsize: {
            name: 'pointsize',
            label: 'point size',
            type: 'integer',
            value: 1,
            minimum: 1,
            maximum: 3,
            writable: false
        },
        grid: {
            name: 'grid',
            label: 'grid size',
            type: 'integer',
            value: 15,
            minimum: 5,
            maximum: 30,
            writable: false
        }
    }, 
    template: {
        code: 
            '<!DOCTYPE html> \n' + 
            '<html> \n'+ 
            '<head> \n' +
            '   <meta charset="UTF-8"> \n' + 
            '   <title>VisPro</title> \n' +
            '</head> \n' +
            '\n' +
            '<body> \n' +
            '\n' + 
            '<%= html %>' +
            '\n' +
            '<script> \n' +
            '\n' +
            '<%= js %>' +
            '\n' +
            '</script> \n' +
            '</body> \n' +
            '</html>',
        parameters: ['html', 'js']
    }
};