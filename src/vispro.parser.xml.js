vispro.parser.XML = Backbone.Model.extend({

    parse: function (vispro_descriptor_xml, callback, context) {

        var widgets_json = [],
            output_template,
            widget_json,
            attrs,
            tag_output_template = 'source',
            tag_widget_list = 'widgets',
            tag_widget = 'widget',
            tag_widget_label = 'label',
            tag_widget_description = 'description',
            tag_widget_images = 'images',
            tag_widget_icon = 'icon',
            tag_widget_image = 'image',
            tag_widget_dimensions = 'dimensions',
            tag_widegt_dependencies = 'dependencies',
            tag_widget_dependency = 'dependency',
            tag_widget_properties = 'properties',
            tag_widget_code = 'code',
            tag_widget_template = 'insert';

        var jdescriptor_xml = $(vispro_descriptor_xml),
            output_template = $.trim(jdescriptor_xml.find('source').text()),
            output_parameters = _.uniq(
                _.map(
                    output_template.match(/<%=\s+(?:[\w]+)\s+%>/g), 
                    function (s) {
                        return s.replace(/[<|%|=|\s|>]/g,'');
                    }
                )
            ),
            widget_json_images,
            widget_json_dimensions,
            widgets_json_properties,
            widget_json_templates,
            widget_json_dependencies,
            widget_json;

        jdescriptor_xml.find(tag_widget_list+'>'+tag_widget).each(function(i, xml_widget_node) {
            j_xml_widget_node = $(xml_widget_node);
            widget_json_icon = {};
            widget_json_image = {};
            widget_json_dimensions = {};
            widget_json_dependencies = {};
            widget_json_properties = {};
            widget_json_templates = {};
            widget_json = {
                'icon': widget_json_icon,
                'image': widget_json_image,
                'dimensions': widget_json_dimensions,
                'properties': widget_json_properties,
                'templates': widget_json_templates,
                'dependencies' : widget_json_dependencies
            };
            attrs = $.getAttributes(j_xml_widget_node);

            //name
            widget_json['name'] = attrs.name;

            //type
            widget_json['type'] = attrs.type;

            //label
            widget_json['label'] = j_xml_widget_node.find(tag_widget_label).text();

            //description
            widget_json['description'] = j_xml_widget_node.find(tag_widget_description).text();

            //icon
            attrs = $.getAttributes(j_xml_widget_node.find(tag_widget_images+'>'+tag_widget_icon));
            widget_json_icon['src'] = attrs.url;

            //image
            attrs = $.getAttributes(j_xml_widget_node.find(tag_widget_images+'>'+tag_widget_image));
            widget_json_image['src'] = attrs.url;

            //dependencies
            j_xml_widget_node.find(tag_widegt_dependencies+'>'+tag_widget_dependency).each(function(j, xml_dependancy_node) {
                var j_xml_dependency_node = $(xml_dependancy_node),
                    widget_property = {};
                    
                attrs = $.getAttributes(j_xml_dependency_node);
                widget_json_dependencies[attrs['type']] = widget_property;
                widget_property.required = attrs['required'] == 'true';
                widget_property['name'] = attrs['name'];
            });

            //dimensions: width - height
            widget_json_dimensions['width'] = {};
            attrs = $.getAttributes(j_xml_widget_node.find(tag_widget_dimensions+'>width'));
            widget_json_dimensions.width['value'] = Number(attrs.value);
            widget_json_dimensions.width['resizable'] = attrs.resizable == 'true';
            attrs.min ? widget_json_dimensions.width['min'] = attrs.min : widget_json_dimensions.width['min'] = Number.NEGATIVE_INFINITY;
            attrs.max ? widget_json_dimensions.width['max'] = attrs.max : widget_json_dimensions.width['max'] = Number.POSITIVE_INFINITY;


            widget_json_dimensions['height'] = {};
            attrs = $.getAttributes(j_xml_widget_node.find(tag_widget_dimensions+'>height'));
            widget_json_dimensions.height['value'] = Number(attrs.value);
            widget_json_dimensions.height['resizable'] = attrs.resizable == 'true';
            attrs.min ? widget_json_dimensions.height['min'] = attrs.min : widget_json_dimensions.height['min'] = Number.NEGATIVE_INFINITY;
            attrs.max ? widget_json_dimensions.height['max'] = attrs.max : widget_json_dimensions.height['max'] = Number.POSITIVE_INFINITY;

            //properties
            j_xml_widget_node.find(tag_widget_properties).children().each(function(k, xml_property_node) {
                var j_xml_property_node = $(xml_property_node),
                    property = {};
                    
                attrs = $.getAttributes(j_xml_property_node);
                widget_json_properties[attrs['name']] = property;
                property.label = attrs['name'];
                property.type = j_xml_property_node[0].nodeName;
                // property.value = attrs['default'] === 'true';
                property.value = attrs['default'];
                property.writable = true;
            });

            //code
            j_xml_widget_node.find(tag_widget_code+'>'+tag_widget_template).each(function(h, xml_template_node) {
                var j_xml_template_node = $(xml_template_node),
                    template = {},
                    text = $.trim(j_xml_template_node.text());
                    
                attrs = $.getAttributes(j_xml_template_node);
                widget_json_templates[attrs['match']] = template;
                template.code = text;

                template.parameters = 
                    _.uniq(
                        _.map(
                            text.match(/<%=\s+(?:[\w]+)\s+%>/g), 
                            function (s) {
                                return s.replace(/[<|%|=|\s|>]/g,'');
                            }
                        )
                    );
            });

            widgets_json.push(widget_json);
        });

        callback.call(context, {
            template: {
                code: output_template,
                parameters: output_parameters
            },
            descriptorList: widgets_json
        });
    }
});