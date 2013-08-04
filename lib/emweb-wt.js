var lexxy = require('lexxy');

var lexer_w = new lexxy.Lexer();
lexer_w.type('TEMPLATE_NAME', /\*\*([A-Za-z0-9_\-\.]+?)\*\a*/m);
lexer_w.type('PLACEHOLDER_VALUE', /[^\*]\*([A-Za-z0-9_\-\.]+?)\*([^]+?)\*\*/m);
lexer_w.type('NONE', /([^]+?)/m);

var r_placeholder = /\<\*([A-Za-z0-9_\-\.]+)\*\>/mg;

var cb_w = function(request, response, request_url, data)
{
	var text = data.toString('utf8');
	var tokens = lexer_w.lex(text);

	var template_name;
	var placeholder_values = {};

	tokens.forEach(function(v, k, a)
	{
		switch(v.type.name)
		{
			case 'TEMPLATE_NAME':
				template_name = v.data[1];
				break;
			case 'PLACEHOLDER_VALUE':
				placeholder_values[v.data[1]] = v.data[2];
				break;
		}
	});

	var template_data = this.get_data(template_name);
	if(!template_data)
	{
		console.log('[WT] template file does not exist');
		return;
	}

	var response_text = template_data.toString('utf8');

	for(var k in placeholder_values)
	{
		response_text = response_text.replace('<*' + k + '*>', placeholder_values[k]);
	}

	// parse out unset placeholders
	response_text = response_text.replace(r_placeholder, '');

	// send data
	response.write(response_text);
}

exports.handlers.w = cb_w;
