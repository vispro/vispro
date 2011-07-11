vispro.data.workspace = {
    type: 'workspace'
    name: 'Workspace',
    dimensions: {
        width: {
            value: 800
        },
        height: {
            value: 450
        }
    },
    properties: {
        grid: {
            type: 'integer',
            name: 'grid',
            value: 15,
            minimum: 5,
            maximum: 30
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