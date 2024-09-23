// Nach Vorschau-Erstellung NL Studio Preview URL in iFrame anpassen
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=nl_preview_urls.js"
);
// Prüfung - Versandzeitpunkt Live Send liegt mindestens 24h in der Zukunft
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=live_send_24_hours_check.js"
);
// Prüfung Versanddatum wenn Agentur produziert.
// $.getScript('https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=check_produktionsdatum_versanddatum_agentur.js');
// Prüfung Versanddatum wenn Center produziert.
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=check_versanddatum_selfservice.js"
);
// Grafikstudio öffnen
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=grafikstudio_preview.js"
);
// Veranschlagte Produktionszeit ausblenden, wenn -1 Arbeitstage angezeigt wird.
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=hide_productionTime.js"
);
// Blendet Hinweistext ein, wenn zum angegebenen Zeitpunkt ein Newsletterversand eingeplant wurde.
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=display_warningtext_shipping_date.js"
);

// Job Area Id speichern
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=save_job_area_id.js"
);
//Prüfung - Proof wurde abgeschickt, sonst Weiter Button deaktiviert
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=proof_triggered.js"
);
//Prüfung - Live Versand wurde eingeplant, sonst Weiter Button deaktiviert
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=live_send_triggered.js"
);
//Die komplette Feldgruppe mit Flächen werden eingeblendet und ausgeblendet.
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=show_and_hide_modules.js"
);
// Per Button-Klick wird der Newsletter heruntergeladen.
$.getScript(
  "https://ece-test.mpp360.cloud/asset/download?bundleName=JS+Scripte&versionName=nl_download.js"
);

/* Expressversand ein- und Ausblenden als eigene Funktion, die bei DocumentReady alle 500 Millisekunden ausgeführt wird
    // Blendet den Block mit dem Expressversand aus, wenn der User doch keine Anfrage dazu starten will
    
    function HideExpressversandSection_and_ClearDateFieldValue() {
    
    console.log("Wert im Datefield:: " + $('#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur').val());
    
    // Für Testzwecke war das gut, aber wenn das Datumsfeld leer ist, muss es ausblenden, daher die Zeilen auskommentiert
     
     if ($('#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur').val() == "") {
     $('#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no').show();
       }
    
    
        // Finde die Checkbox 
      var checkbox = $('#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no_0');
        
      if (checkbox.prop('checked')) {
      // Wenn die Checkbox ausgewählt ist, blende den BLock mit der Klasse express_label aus und lösche den Inhalt im Datumsfeld
      $('#.express_label').hide();
      $('#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur').val("");
    
    
    // checkbox selbst unchecken, sonst wird die Funktion immer wieder getriggert
    
    $('#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no_0').prop( "checked", false );
        console.log("Checkbox:: " + checkbox);
    
       } else {
    
          // Wenn die Checkbox nicht ausgewählt ist
       //   console.log( "Checkbox für keinen Expressversand ist nicht ausgewählt");
        }
    
    }
    
    $(document).ready(function () {
     setInterval(HideExpressversandSection_and_ClearDateFieldValue, 500); // Prüfung alle 500ms
     });
    
    
    End of the function for Expressversand */

// Check Inpute date Funktion: just for testing directly inserted into the JS field, copied from check_produktionsdatum_versanddatum_agentur.js
// later we need to exclude it into a JS file and have to check if we need t oreactivate the separate including of the check_produktionsdatum_versanddatum_agentur.js
// currently the include is marked out, see line 6

function pruefeDatum(result) {
  var versand = $(
    "#job_update_data_fg_rahmendaten_dp_nl_produktion_versanddatum"
  );
  var produktion = $(
    "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
  );
  var versanddatum = $(
    "#job_update_data_fg_rahmendaten_dp_nl_produktion_versanddatum"
  ).val();
  var produktionsdatum = $(
    "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
  ).val();

  // CR in Jiraticket CN-5683
  // Wir könnten uns eine eigene Variable als hiddenfield im Formular definieren, die über die globals übergeben wird, siehe oben, nach diesem Schema.
  // bspw. die Quellenkennung, welches Pattern hier den Aufruf startet, also sowas wie diese:
  var quelleAufruf = $(
    "#job_update_data_fg_rahmendaten_hidden_hq_send_skip_7days_check"
  ).val();
  // diese bauen wir dann unten in die Prüfung der 7 Tage ein, und wenn true, dann skippen wir die Prüfung

  //  Konvertierung der Datumsstrings in JavaScript-Datumsobjekte
  var eingegebenesDatumVersand = parseCustomDateString(versanddatum);
  var eingegebenesDatumProd = parseCustomDateString(produktionsdatum);

  // Prüfen, ob eingegebenesDatumVersand mindestens x Stunden nach eingegebenesDatumProd liegt
  var minVersandDate = new Date(eingegebenesDatumProd);
  new Date(minVersandDate.getTime() + 25 * 60 * 60 * 1000);

  // Aktuelles Datum ohne Uhrzeit (um Mitternacht)
  // Aktuelles Datum
  var aktuellesDatum = new Date();

  // Berechne das Datum nach 7 Tagen
  var produktionsTag = new Date(aktuellesDatum);
  produktionsTag.setDate(produktionsTag.getDate() + 6);

  var labelVersand = $(
    'label[for="job_update_data_fg_rahmendaten_dp_nl_produktion_versanddatum"]'
  );
  var labelProduktion = $(
    'label[for="job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"]'
  );

  // Remove existing error messages
  $("#errorDivElement").remove();
  $("#errorProduktion").remove();

  $(labelProduktion).addClass("error").removeAttr("style");
  $(labelVersand).addClass("error").removeAttr("style");

  var buttonDisabled = false;
  var errorVersand = false;
  var errorProduktion = false;
  var errorProduktionIsInPast = false;

  console.log("eingegebenesDatumVersand. :: " + eingegebenesDatumVersand);
  console.log("minVersandDate :: " + minVersandDate);
  console.log("eingegebenesDatumProd ::" + eingegebenesDatumProd);
  console.log("produktionsTag ::" + produktionsTag);
  console.log("quelleAufruf ::" + quelleAufruf);

  // Check if eingegebenesDatumVersand is at least one day after eingegebenesDatumProd
  if (eingegebenesDatumVersand <= minVersandDate) {
    // Error for Versanddatum
    errorVersand = true;
    buttonDisabled = true;
    var errorVersandAgentur =
      '<div id="errorDivElement"><p style="color: #a94442;font-size:0.875em;">Das Versanddatum muss mindestens 25 Stunden nach dem Produktionsdatum liegen.</p></div>';
  }

  // Begin of Skip the 7 days prodtime check, if the requesting pattern is the one of the HQ, because the HQ-requester is deciding if a Newsletter
  //could be produced in less then 7 days, so no check and message is needed
  if (quelleAufruf != "skipcheck") {
    // Check if eingegebenesDatumProd is at least 7 days in the future
    if (result) {
      console.log("HELO");
      // Note by marc for myself: normally this two lines of code are active to prevent to chose a date <7 days,
      // but now we just need the system to ask the user if he wants to ask for approval of a faster producion
      // later we need to think about, to check about the decline or the approval and skip the check

      // Error for Produktionsdatum
      // errorProduktion = true;
      // buttonDisabled = true;

      $(".mpp360__field-expressversand_yes_no").parent().show();
      $(".mpp360__field-textfield_grund_expressversand").parent().show();

      $(".expressversand_label").show();

      // Code Snippet aus HideExpressversandSection_and_ClearDateFieldValue() denn eigentlich muss die Anfrage für den Express hier starten
      // und zwar nur, wenn es weniger als 7 Tage sind

      // Finde die Checkbox für "Nein kein Expressversand anfragen"
      var checkbox = $(
        "#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no_0"
      );
      if (checkbox.prop("checked")) {
        // Finde die Radiobuttons und blende sie aus, niht mehr nötig seitdem wir eine Klasse hinzugefügt haben
        //  $('#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no').hide();

        //  Wenn die Checkbox ausgewählt ist, verstecke die DIVs mit der Klasse, die wir im Pattern JSON hinzugefügt haben
        $(".expressversand_label").hide();

        //Setze den Wert im Datumsfeld auf LEER (das triggert kein OnChange Event, daher blendet er den Expressversand nicht ein, wenn man das gleiche Datum wählt)
        // Müssen wir die Funktion hier herausnehmen? Damit wir sie bei diversen Events auufrufen können, bpsw. beim Onklick Event ins Datefield?
        // Just a try: check if the new chosen date is the same like the one before, because the browser still has it as value, its just not visible
        //and to trigger the Expressversand decision again, even he chose the same date:
        //possible events: Datepicker beforeShow :: when the user clicks, the expressdialog will appear as date is still the old one until he choses another and so will trigger the ChangeEvent

        // To clean the field we use this:
        //$('#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur').val("");

        // We just set the focus back on the datepicker field, without cleaning the chosen date so the user can see which date he chose bevor he decided to chose another
        $(
          "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
        ).focus();

        // checkbox selbst unchecken, sonst wird die Funktion immer wieder getriggert
        $(
          "#job_update_data_fg_rahmendaten_dp_nl_produktion_expressversand_yes_no_0"
        ).prop("checked", false);
      }
    } else {
      $(".mpp360__field-expressversand_yes_no").parent().hide();
      $(".mpp360__field-textfield_grund_expressversand").parent().hide();
    }
  } else if (quelleAufruf == "skipcheck") {
    // But we have to to prevent the requester chooses a date of the past or the date of today so we use the already existing variable aktuellesDatum to check
    if (eingegebenesDatumProd < aktuellesDatum) {
      errorProduktionIsInPast = true;
      buttonDisabled = true;
    }
  }
  // End of Skip the 7 days prodtime check

  // Check if eingegebenesDatumVersand is more than 175 days in the future
  var maxVersandDate = new Date(aktuellesDatum);
  maxVersandDate.setDate(maxVersandDate.getDate() + 175);
  if (eingegebenesDatumVersand > maxVersandDate) {
    // Error for Versanddatum
    errorVersand = true;
    buttonDisabled = true;
    var errorVersandAgentur =
      '<div id="errorDivElement"><p style="color: #a94442;font-size:0.875em;">Das Versanddatum darf nicht mehr als 6 Monate in der Zukunft liegen.</p></div>';
  }

  // Display error messages if necessary
  if (errorVersand) {
    $(versand).after(errorVersandAgentur);
    $(labelVersand).addClass("error").css("color", "#a94442");
  }

  if (errorProduktion) {
    var errorDivProduktion =
      '<div id="errorProduktion"><p style="color: #a94442;font-size:0.875em;">Das gewählte Produktionsdatum muss mindestens 7 Tage in der Zukunft liegen. Bitte passen Sie das Datum entsprechend an.</p></div>';
    $(produktion).after(errorDivProduktion);
    $(labelProduktion).addClass("error").css("color", "#a94442");
  }

  if (errorProduktionIsInPast) {
    var errorDivProduktion =
      '<div id="errorProduktion"><p style="color: #a94442;font-size:0.875em;">Das gewählte Produktionsdatum liegt in der Vergangenheit oder ist das heutige Datum. Bitte passen Sie das Datum entsprechend an.</p></div>';
    $(produktion).after(errorDivProduktion);
    $(labelProduktion).addClass("error").css("color", "#a94442");
  }

  // Enable/disable the button
  document.getElementById("bpmn-btn-draft").disabled = buttonDisabled;
}

function parseDate(dateString) {
  const parts = dateString.split(".");
  return new Date(parts[2], parts[1] - 1, parts[0]); // Year, Month (0-based), Day
}

// Function to parse custom date string format "DD.MM.YYYY HH:mm"
function checkDateDifference() {
  // let versanddatum = $(
  //   "#job_update_data_fg_rahmendaten_dp_nl_produktion_versanddatum"
  // ).val();
  let versanddatum = new Date(Date.now())
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replaceAll("/", ".");
  let produktionsfrist = $(
    "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
  ).val();
  // Return early if either value is missing
  if (!produktionsfrist) {
    return;
  }

  // Extract only the date part if the time is included in versanddatum
  // versanddatum = versanddatum.split(" ")[0];

  // Parse the dates correctly
  const versanddatumDate = parseDate(versanddatum);
  const produktionsfristDate = parseDate(produktionsfrist);

  console.log({ versanddatumDate, produktionsfristDate });

  // Calculate the difference in time between the two dates in milliseconds
  const timeDifference = produktionsfristDate - versanddatumDate;

  // Convert the difference from milliseconds to days
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  console.log(dayDifference);

  // Check the conditions and return the result
  if (dayDifference < 0) {
    // versanddatum is after produktionsfrist
    return false;
  } else if (dayDifference <= 7) {
    // versanddatum is within 7 days before produktionsfrist
    return true;
  } else {
    // versanddatum is more than 7 days before produktionsfrist
    return false;
  }
}

if ($("#bpmn-btn-draft").length) {
  $(document).ajaxComplete(function () {
    if (
      $(
        job_update_data_fg_rahmendaten_dp_nl_produktion_newsletter_inhaltsproduktion_0
      ).prop("checked")
    ) {
      // note from Marc: We need to check if there is no date currently and if there is no date, we have to hide the part of the expressversand

      if (
        $(
          "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
        ).val() == ""
      ) {
        $(".expressversand_label").hide();
      }
      const result = checkDateDifference();
      pruefeDatum(result);

      $(
        "#job_update_data_fg_rahmendaten_dp_nl_produktion_produktionsfrist_agentur"
      ).on("change", function (e) {
        const result = checkDateDifference();
        pruefeDatum(result);
      });

      //   $("#job_update_data_fg_rahmendaten_dp_nl_produktion_versanddatum").on(
      //     "change",
      //     function (e) {
      //       const result = parseCustomDateString();
      //       console.log({ result });
      //       pruefeDatum(result);
      //       pruefeDatum();
      //     }
      //   );
    }
  });
}

// End of Pruefdatum, codelines below have been there before, not from DSC/Marc

function areaUpdate() {
  $("#accordion-areas-newsletter_modules tr").each(function () {
    // Überprüfe jedes <tr>-Element im tbody
    if ($(this).find('span:contains("DigitalMall Modul")').length > 0) {
      // Wenn das <span>-Element gefunden wird
      //default Werte neu setzen bei hinzufügen von Fläche
      $(
        '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_content"]'
      )
        .val("Agentur")
        .change();
      $(
        '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_briefing_type"]'
      )
        .val("Modul")
        .change();
      $(
        '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_process_step"]'
      )
        .val("Center")
        .change();

      // Überprüfe, ob das Feld job_update_data_fg_hidden_fields_digitalmall_headline_modul_01 nicht leer ist
      var headlineField = $(
        "#job_update_data_newsletter_modules_check_headline_digitalmall_01"
      );
      var inhaltsproduktionField = $(
        "#job_update_data_newsletter_modules_content_production"
      );
      var briefingStyleField = $(
        "#job_update_data_newsletter_modules_briefing_style"
      );
      var processStatusField = $(
        "#job_update_data_newsletter_modules_process_status"
      );
      if (headlineField.length > 0 && headlineField.val() != "") {
        // Wenn das Feld nicht leer ist
        $(
          '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_status_blog"]'
        )
          .val("entries")
          .change();
        if (inhaltsproduktionField.val() == "Center") {
          $(
            '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_content"]'
          )
            .val("Center")
            .change();
        }
        if (briefingStyleField.val() == "0_text") {
          $(
            '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_briefing_type"]'
          )
            .val("Text")
            .change();
        }
        if (processStatusField.val() == "Agentur") {
          $(
            '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_process_step"]'
          )
            .val("Agentur")
            .change();
        }
      } else {
        // Wenn das Feld leer ist
        $(
          '[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_status_blog"]'
        )
          .val("empty")
          .change();
      }
    }
  });
}

if (
  $("#bpmn-btn-briefing").length ||
  $("#bpmn-btn-module").length ||
  $("#bpmn-btn-produktion").length ||
  $("#bpmn-btn-produktion_vorgaben").length
) {
  $(document).ajaxComplete(function () {
    if ($(".mpp360__field-text_digitalmall_01_hidden").length < 2) {
      $(".mpp360__field-text_digitalmall_01_hidden")
        .clone()
        .appendTo(
          'div[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_radio_digitalmall_01"] .form-check:nth-child(1)'
        )
        .find("div.display_none")
        .removeClass("display_none");
      $(".mpp360__field-text_digitalmall_02_hidden")
        .clone()
        .appendTo(
          'div[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_radio_digitalmall_01"] .form-check:nth-child(2)'
        )
        .find("div.display_none")
        .removeClass("display_none");
      $(".mpp360__field-text_digitalmall_03_hidden")
        .clone()
        .appendTo(
          'div[id^="job_update_areas_area_"][id$="_fg_digitalmall_modul_dp_digitalmall_modul_radio_digitalmall_01"] .form-check:nth-child(3)'
        )
        .find("div.display_none")
        .removeClass("display_none");
    }
    // Gibt es keinen zweiten Blogeintrag, wird der Radio Button ausgeblendet
    if (
      $(
        "#job_update_data_newsletter_modules_check_headline_digitalmall_02"
      ).val() == ""
    ) {
      $(".mpp360__field-radio_digitalmall_01 .form-check:nth-child(2)").hide();
    }
    // Gibt es keinen dritten Blogeintrag, wird der Radio Button ausgeblendet
    if (
      $(
        "#job_update_data_newsletter_modules_check_headline_digitalmall_03"
      ).val() == ""
    ) {
      $(".mpp360__field-radio_digitalmall_01 .form-check:nth-child(3)").hide();
    }
    // Existiert nur Blogeintrag 1, ist dieser direkt ausgewählt
    if (
      $(
        "#job_update_data_newsletter_modules_check_headline_digitalmall_02"
      ).val() == "" &&
      $(
        "#job_update_data_newsletter_modules_check_headline_digitalmall_03"
      ).val() == ""
    ) {
      $(
        ".mpp360__field-radio_digitalmall_01 .form-check:nth-child(1) input"
      ).trigger("click");
    }
  });
  setTimeout(function () {
    areaUpdate();
  }, 2000);
}

$(document).on("jf.area.added", function (event, jobAreaId) {
  // Your custom logic here
  areaUpdate();
});

if ($("#bpmn-btn-module").length) {
  function createOverlay() {
    const overlay = $('<div id="overlay"></div>');
    $("body").append(overlay);
    return overlay;
  }
  createOverlay();
  function positionOverlay() {
    const button = $("#bpmn-btn-module");
    const overlay = $("#overlay");
    const buttonOffset = button.offset();
    const buttonWidth = button.outerWidth();
    const buttonHeight = button.outerHeight();

    overlay.css({
      top: buttonOffset.top,
      left: buttonOffset.left,
      width: buttonWidth,
      height: buttonHeight,
    });
  }
  $("#overlay").click(function () {
    if ($(".area-content").length < 3) {
      // console.log("Anzahl Flächen kleiner als 3");
      // Modal anzeigen
      Swal.fire({
        title: "Modulprüfung",
        text: 'Es ist aufgefallen, dass weniger als drei Newsletter Module vorhanden sind. Bitte klicken Sie auf "Module bearbeiten" um diese Meldung zu schließen und weitere Module hinzuzufügen oder klicken Sie auf "Trotzdem fortfahren" um die Anzahl der Module zu bestätigen.',
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Module bearbeiten",
        cancelButtonText: "Trotzdem fortfahren",
      }).then((result) => {
        if (result.isConfirmed) {
          // Funktionalität für "Module bearbeiten"
          // console.log('Module bearbeiten geklickt');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Funktionalität für "Trotzdem fortfahren"
          // console.log('Trotzdem fortfahren geklickt');
          $("#bpmn-btn-module").click();
        }
      });
    } else {
      // console.log("Anzahl Flächen ok");
      $("#bpmn-btn-module").trigger("click");
    }
  });
  $(window).resize(function () {
    if ($("#overlay").is(":visible")) {
      positionOverlay();
    }
  });
  positionOverlay();
}
if ($("#bpmn-btn-briefing").length) {
  function createOverlay() {
    const overlay = $('<div id="overlay"></div>');
    $("body").append(overlay);
    return overlay;
  }
  createOverlay();
  function positionOverlay() {
    const button = $("#bpmn-btn-briefing");
    const overlay = $("#overlay");
    const buttonOffset = button.offset();
    const buttonWidth = button.outerWidth();
    const buttonHeight = button.outerHeight();

    overlay.css({
      top: buttonOffset.top,
      left: buttonOffset.left,
      width: buttonWidth,
      height: buttonHeight,
    });
  }
  $("#overlay").click(function () {
    if (
      $(
        "#job_update_data_newsletter_briefing_betreff_dp_select_briefing_briefing_select_1"
      ).prop("checked") &&
      $(".area-content").length < 3
    ) {
      // console.log("Anzahl Flächen kleiner als 3");
      // Modal anzeigen
      Swal.fire({
        title: "Modulprüfung",
        text: 'Es ist aufgefallen, dass weniger als drei Newsletter Module vorhanden sind. Bitte klicken Sie auf "Module bearbeiten" um diese Meldung zu schließen und weitere Module hinzuzufügen oder klicken Sie auf "Trotzdem fortfahren" um die Anzahl der Module zu bestätigen.',
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Module bearbeiten",
        cancelButtonText: "Trotzdem fortfahren",
      }).then((result) => {
        if (result.isConfirmed) {
          // Funktionalität für "Module bearbeiten"
          // console.log('Module bearbeiten geklickt');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Funktionalität für "Trotzdem fortfahren"
          // console.log('Trotzdem fortfahren geklickt');
          $("#bpmn-btn-briefing").click();
        }
      });
    } else {
      // console.log("Anzahl Flächen ok");
      $("#bpmn-btn-briefing").trigger("click");
    }
  });
  $(window).resize(function () {
    if ($("#overlay").is(":visible")) {
      positionOverlay();
    }
  });
  positionOverlay();
}
