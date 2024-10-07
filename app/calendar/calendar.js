import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";

const CalendarPage = () => {
  	
  	return (
    		<View style={styles.calendarpage}>
      			<View style={styles.calendar} />
      			<View style={[styles.calendarpageChild, styles.thisu1ShadowBox]} />
      			<View style={[styles.firstsa, styles.thisu1ShadowBox]} />
      			<View style={[styles.firstth, styles.thisu1ShadowBox]} />
      			<View style={[styles.firstwe, styles.firstweShadowBox]} />
      			<View style={[styles.firsttu, styles.firstweShadowBox]} />
      			<View style={[styles.firstmo, styles.thisu1ShadowBox]} />
      			<View style={[styles.firstsu, styles.thisu1ShadowBox]} />
      			<Text style={[styles.sa, styles.saTypo]}>{`SA
`}</Text>
            <Text style={[styles.we, styles.saTypo]}>WE</Text>
            <Text style={[styles.th, styles.saTypo]}>TH</Text>
            <Text style={[styles.fr, styles.saTypo]}>FR</Text>
            <Text style={[styles.tu, styles.saTypo]}>TU</Text>
            <View style={[styles.leftbutton, styles.leftbuttonLayout]} />
            <View style={[styles.rightbutton, styles.leftbuttonLayout]} />
            <Text style={[styles.mo, styles.saTypo]}>MO</Text>
            <Text style={[styles.su, styles.saTypo]}>SU</Text>
            <View style={[styles.fifsa, styles.fifsaShadowBox]} />
            <View style={[styles.fiffr, styles.fifsaShadowBox]} />
            <View style={[styles.fifth, styles.fifsaShadowBox]} />
            <View style={[styles.fifwe, styles.fifweShadowBox]} />
            <View style={[styles.fiftu, styles.fifweShadowBox]} />
            <View style={[styles.fifmo, styles.fifsaShadowBox]} />
            <View style={[styles.fifsu, styles.fifsaShadowBox]} />
            <View style={[styles.foursa, styles.foursaShadowBox]} />
            <View style={[styles.fourfr, styles.foursaShadowBox]} />
            <View style={[styles.fourth, styles.foursaShadowBox]} />
            <View style={[styles.fourwe, styles.fourweShadowBox]} />
            <View style={[styles.fourtu, styles.fourweShadowBox]} />
            <View style={[styles.fourmo, styles.foursaShadowBox]} />
            <View style={[styles.foursu, styles.foursaShadowBox]} />
            <View style={[styles.thisu, styles.thisuShadowBox]} />
            <View style={[styles.thifr, styles.thisuShadowBox]} />
            <View style={[styles.thith, styles.thisuShadowBox]} />
            <View style={[styles.thiwe, styles.thiweShadowBox]} />
            <View style={[styles.thitu, styles.thiweShadowBox]} />
            <View style={[styles.thimo, styles.thisuShadowBox]} />
            <View style={[styles.thisu1, styles.thisu1ShadowBox]} />
            <View style={[styles.secsa, styles.secsaShadowBox]} />
            <View style={[styles.secfr, styles.secsaShadowBox]} />
            <View style={[styles.secth, styles.secsaShadowBox]} />
            <View style={[styles.secwe, styles.secweShadowBox]} />
            <View style={[styles.sectu, styles.secweShadowBox]} />
            <View style={[styles.secmo, styles.secsaShadowBox]} />
            <View style={[styles.secsu, styles.secsaShadowBox]} />
            <Image style={styles.monthtitleIcon} resizeMode="cover" source="monthTitle.png" />
        </View>);
};

const styles = StyleSheet.create({
    thisu1ShadowBox: {
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    firstweShadowBox: {
        top: 273,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    saTypo: {
        textAlign: "left",
        color: "#000",
        fontFamily: "Inter-Regular",
        fontSize: 12,
        top: 243,
        position: "absolute"
    },
    leftbuttonLayout: {
        height: 41,
        width: 43,
        borderWidth: 1,
        backgroundColor: "#f6fbff",
        borderRadius: 17,
        top: 155,
        borderColor: "#000",
        borderStyle: "solid",
        position: "absolute"
    },
    fifsaShadowBox: {
        top: 474,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    fifweShadowBox: {
        top: 475,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    foursaShadowBox: {
        top: 423,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    fourweShadowBox: {
        top: 424,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    thisuShadowBox: {
        top: 371,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    thiweShadowBox: {
        top: 372,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    secsaShadowBox: {
        top: 320,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    secweShadowBox: {
        top: 321,
        height: 33,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    calendar: {
        top: 221,
        left: 30,
        borderRadius: 53,
        backgroundColor: "#4ca5e4",
        borderWidth: 4,
        width: 330,
        height: 316,
        borderColor: "#000",
        borderStyle: "solid",
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    calendarpageChild: {
        left: 264,
        top: 272,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7
    },
    firstsa: {
        left: 309,
        top: 272,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7
    },
    firstth: {
        left: 220,
        top: 272,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7
    },
    firstwe: {
        left: 177
    },
    firsttu: {
        left: 133
    },
    firstmo: {
        left: 91,
        top: 272,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7
    },
    firstsu: {
        left: 47,
        top: 272,
        width: 35,
        backgroundColor: "#89d5ff",
        borderRadius: 7
    },
    sa: {
        left: 315
    },
    we: {
        left: 185
    },
    th: {
        left: 229
    },
    fr: {
        left: 274
    },
    tu: {
        left: 142
    },
    leftbutton: {
        left: 64
    },
    rightbutton: {
        left: 282
    },
    mo: {
        left: 98
    },
    su: {
        left: 56
    },
    fifsa: {
        left: 309
    },
    fiffr: {
        left: 264
    },
    fifth: {
        left: 220
    },
    fifwe: {
        left: 177
    },
    fiftu: {
        left: 133
    },
    fifmo: {
        left: 91
    },
    fifsu: {
        left: 47
    },
    foursa: {
        left: 309
    },
    fourfr: {
        left: 264
    },
    fourth: {
        left: 220
    },
    fourwe: {
        left: 177
    },
    fourtu: {
        left: 133
    },
    fourmo: {
        left: 91
    },
    foursu: {
        left: 47
    },
    thisu: {
        left: 308
    },
    thifr: {
        left: 263
    },
    thith: {
        left: 219
    },
    thiwe: {
        left: 176
    },
    thitu: {
        left: 132
    },
    thimo: {
        left: 90
    },
    thisu1: {
        top: 370,
        left: 46
    },
    secsa: {
        left: 309
    },
    secfr: {
        left: 264
    },
    secth: {
        left: 220
    },
    secwe: {
        left: 177
    },
    sectu: {
        left: 133
    },
    secmo: {
        left: 91
    },
    secsu: {
        left: 47
    },
    monthtitleIcon: {
        left: 120,
        borderRadius: 10,
        width: 149,
        height: 36,
        top: 155,
        position: "absolute"
    },
    calendarpage: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: 844,
        overflow: "hidden"
    }
});

export default CalendarPage;
