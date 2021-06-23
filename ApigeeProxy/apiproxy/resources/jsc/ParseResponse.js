var content = context.getVariable("response.content");
content = content.replace("San Jose", "San Francisco");
content = JSON.parse(content);

content.givenName = content.firstName;
delete content.firstName;
content.surName = content.lastName;
delete content.lastName;

context.setVariable("response.content", JSON.stringify(content));