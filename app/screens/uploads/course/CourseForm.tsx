import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { scheduleOptions } from "../../../../Constants";
import { futureDate } from "../../../../helpers";
import { useTranslation } from "../../../hooks/useTranslations";
import { colors } from "../../../theme/colors";
import { grantContesttSyles } from "../../styles/styles";
import { CourseControler } from "./CourseControler";
export const CourseForm = ({ navigation }) => {
  const { t } = useTranslation();
  const [formattedStarDate, setFormattedStarDate] = useState("");
  const renderItem = (item) => {
    return (
      <View style={grantContesttSyles.item}>
        <Text style={grantContesttSyles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const [endDate, setEndDate] = useState(futureDate);
  const [startDate, seStartDate] = useState(new Date());
  const [showStartDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [endDateError, setEndDateError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
  const toggleShowPicker = () => {
    setShowDatePicker(!showStartDatePicker);
  };
  const toggleShowFinishDatePicker = () => {
    setShowFinishDatePicker(!showFinishDatePicker);
  };
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || startDate;
    setShowDatePicker(false);
    const formattedStartDate = currentDate.toLocaleDateString("en-GB");
    setFormattedStarDate(formattedStartDate);
    if (currentDate > endDate) {
      setStartDateError(true);
      return;
    }
    setStartDateError(false);
    seStartDate(currentDate);
    handleChangeTex(formattedStartDate, "startDate");
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate: Date = selectedDate || endDate;
    setShowFinishDatePicker(false);
    const formattedDate = currentDate.toLocaleDateString("en-GB");
    setFormattedDate(formattedDate);

    if (currentDate < startDate) {
      setEndDateError(true);
      return;
    }
    setEndDateError(false);
    setEndDate(currentDate);
    handleChangeTex(formattedDate, "finishDate");
  };

  const {
    handleChangeTex,
    saveCourse,
    state,
    setShowErrors,
    pickImage,
    checkAllTextFields,
    image,
    showErrors,
  } = CourseControler();

  const handleSave = async () => {
    if (checkAllTextFields()) {
      const success = await saveCourse();
      if (success) await navigation.navigate("SuccesUpload");
    } else {
      setShowErrors(true);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <View style={{ flexDirection: "column", padding: 15 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: colors.secondary,
            paddingBottom: 20,
          }}
        >
          {t("all.mandatory.field")}
        </Text>
        <Text style={styles.mainTitle}>{t("basic.information")}</Text>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("course.name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "courseName")}
            value={state.courseName}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.courseName ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("instructor.name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "instructorName")}
            value={state.instructorName}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.instructorName ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("organization.centre")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "organizationCentre")}
            value={state.organizationCentre}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.organizationCentre ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("description")}</Text>
          <TextInput
            style={[styles.text_intup, { minHeight: 60 , textAlignVertical:"top", paddingTop:5}]}
            onChangeText={(value) => handleChangeTex(value, "description")}
            value={state.description}
            multiline={true}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.description ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>

        <View style={[styles.divided, { marginTop: 15 }]}>
          <Text style={styles.title}>{t("location")}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "column", width: "48%" }}>
              <TextInput
                style={styles.text_intup}
                onChangeText={(value) => handleChangeTex(value, "city")}
                value={state.city}
                placeholder={t("city")}
                keyboardType="default"
              />
              {showErrors && !state.city ? (
                <Text style={grantContesttSyles.errors}>{t("error")}</Text>
              ) : null}
            </View>
            <View style={{ flexDirection: "column", width: "48%" }}>
              <TextInput
                style={styles.text_intup}
                onChangeText={(value) => handleChangeTex(value, "country")}
                value={state.country}
                placeholder={t("country")}
                keyboardType="default"
              />
              {showErrors && !state.country ? (
                <Text style={grantContesttSyles.errors}>{t("error")}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.divided}>
          <Text style={styles.mainTitle}>{t("dates.and.place")}</Text>
          <Text style={styles.title}>{t("start.date.course")}</Text>
          <Pressable onPress={toggleShowPicker}>
            <TextInput
              style={grantContesttSyles.text_intup}
              value={formattedStarDate}
              placeholder={t("start.date.placeholder")}
              editable={false}
            />
          </Pressable>

          {showStartDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={startDate}
              onChange={onChangeStartDate}
            />
          ) : null}
          {startDateError ? (
            <Text style={grantContesttSyles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.startDate ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}

          <Text style={grantContesttSyles.title}>{t("end.date")}</Text>
          <Pressable onPress={toggleShowFinishDatePicker}>
            <TextInput
              style={grantContesttSyles.text_intup}
              value={formattedDate}
              placeholder={t("dead.line.placeholder")}
              editable={false}
            />
          </Pressable>
          {showFinishDatePicker ? (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={new Date()}
              onChange={onChangeEndDate}
            />
          ) : null}
          {endDateError ? (
            <Text style={grantContesttSyles.errors}>{t("error.date")}</Text>
          ) : null}
          {showErrors && !state.finishDate ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}

          <Text style={styles.title}>{t("shedule")}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={scheduleOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={t("select.option")}
            searchPlaceholder="Search..."
            value={state.schedule}
            onChange={(item) => {
              handleChangeTex(item.value, "schedule");
            }}
            renderItem={renderItem}
          />
          {showErrors && !state.schedule ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>

        <View style={styles.divided}>
          <Text style={styles.mainTitle}>{t("prices.spots")}</Text>
          <Text style={styles.title}>{t("prices")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "price")}
            value={state.price}
            placeholder={t("prices")}
            keyboardType="numeric"
          />
          {showErrors && !state.price ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}

          <Text style={styles.title}>{t("spots")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "spots")}
            value={state.spots}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.spots ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}

          <Text style={styles.title}>{t("contest.url")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "weburl")}
            value={state.weburl}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.weburl ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ color: colors.palette.neutral700, paddingEnd: 8 }}>
            {t("select.promotional.image")}
          </Text>

          <Ionicons
            name="add-circle"
            size={30}
            color={colors.secondary}
            onPress={pickImage}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        {/* Si los campos obligatorios no están cumplidos, que el botón esté desactivado */}
        <Pressable style={styles.publish_button} onPress={handleSave}>
          <Text style={styles.publis_button_text}>{t("publish")}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: "700",
    color: colors.text,
  },
  mainTitle: {
    fontSize: 19,
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: "700",
    color: colors.main,
  },
  divided: {
    paddingBottom: 8,
  },
  dropdown: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
    padding: 7,
    marginTop: 5,
  },
  text_intup: {
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C9C6C6",
    height: 40,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  cash_texinput: {
    width: "50%",
  },
  selectedTextStyle: {
    fontSize: 15,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  cash_title: { fontSize: 14, letterSpacing: 1 },
  publish_button: {
    display: "flex",
    height: 45,
    borderRadius: 30,
    width: "90%",
    paddingHorizontal: 40,
    justifyContent: "center",
    backgroundColor: colors.main,
  },
  publis_button_text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.25,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.dateText,
  },
});
