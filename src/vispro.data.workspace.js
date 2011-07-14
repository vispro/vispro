vispro.data.workspace = {
    type: 'workspace',
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
            type: 'number',
            value: 15,
            min: 5,
            max: 30
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