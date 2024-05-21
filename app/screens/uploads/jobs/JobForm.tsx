import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  ContracTypeOptions,
  WorkModelOptions,
  WorkingHoursOptions,
} from "../../../../Constants";
import { useTranslation } from "../../../hooks/useTranslations";
import { colors } from "../../../theme/colors";
import { grantContesttSyles } from "../../styles/styles";
import { JobControler } from "./JobControler";

export const JobFormView = ({ navigation }) => {
  const renderItem = (item) => {
    return (
      <View style={grantContesttSyles.item}>
        <Text style={grantContesttSyles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const { t } = useTranslation();

  const {
    handleChangeTex,
    saveJob,
    state,
    setShowErrors,
    checkAllTextFields,
    showErrors,
  } = JobControler();

  const handleSave = async () => {
    if (checkAllTextFields()) {
      const success = await saveJob();
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
          <Text style={styles.title}>{t("position.name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "position")}
            value={state.position}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.position ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("company.name")}</Text>
          <TextInput
            style={styles.text_intup}
            onChangeText={(value) => handleChangeTex(value, "companyName")}
            value={state.companyName}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.companyName ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>

        <View style={styles.divided}>
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
          <Text style={styles.mainTitle}>{t("position.detail")}</Text>
          <Text style={styles.title}>{t("work.model")}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={WorkModelOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={t("select.option")}
            searchPlaceholder="Search..."
            value={state.workModel}
            onChange={(item) => {
              handleChangeTex(item.value, "workModel");
            }}
            renderItem={renderItem}
          />
          {showErrors && !state.workModel ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("contract.type")}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={ContracTypeOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={t("select.option")}
            searchPlaceholder="Search..."
            value={state.contractType}
            onChange={(item) => {
              handleChangeTex(item.value, "contractType");
            }}
            renderItem={renderItem}
          />
          {showErrors && !state.contractType ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.title}>{t("working.hours")}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={WorkingHoursOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={t("select.option")}
            searchPlaceholder="Search..."
            value={state.workingHours}
            onChange={(item) => {
              handleChangeTex(item.value, "workingHours");
            }}
            renderItem={renderItem}
          />
          {showErrors && !state.workingHours ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={styles.divided}>
          <Text style={styles.mainTitle}>{t("working.description.title")}</Text>
          <Text style={styles.title}>{t("working.description")}</Text>
          <TextInput
            style={[styles.text_intup, { minHeight: 60 , textAlignVertical:"top", paddingTop:5}]}
            onChangeText={(value) => handleChangeTex(value, "description")}
            value={state.description}
            multiline={true}
            placeholder={t("working.description")}
            keyboardType="default"
          />
          {showErrors && !state.workingHours ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={[styles.divided, { marginTop: 15 }]}>
          <Text style={styles.title}>{t("skills.requirements")}</Text>
          <TextInput
            style={[styles.text_intup, { minHeight: 60 , textAlignVertical:"top", paddingTop:5}]}
            onChangeText={(value) => handleChangeTex(value, "requirements")}
            value={state.requirements}
            multiline={true}
            placeholder={t("basic.information")}
            keyboardType="default"
          />
          {showErrors && !state.requirements ? (
            <Text style={grantContesttSyles.errors}>{t("error")}</Text>
          ) : null}
        </View>
        <View style={[styles.divided, { marginTop: 15 }]}>
          <Text style={styles.title}>{t("job.url")}</Text>
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
