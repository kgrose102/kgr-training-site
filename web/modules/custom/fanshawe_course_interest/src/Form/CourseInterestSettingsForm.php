<?php

namespace Drupal\fanshawe_course_interest\Form;
// Doesn't require the src directory

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements the Course Interst Settings Form
 */

Class CourseInterestSettingsForm extends ConfigFormBase {

    /**
    * {@inheritdoc}
    */
    protected function getEditableConfigNames() {
        return ['fanshawe_course_interest.settings'];
        }

    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'Fanshawe_course_interest_settings_form';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $config = $this->config('fanshawe_course_interest.settings');

        /*******************
         * Content Types
         ***************/
        $form['content_types'] = [
            '#type' => 'checkboxes',
            '#title' => $this->t('Content Types'),
            '#description' => $this->t('Select which content types to enable the Course Interest option for.'),
            '#options' => node_type_get_names(),
            '#default_value' => !empty($config->get('content_types')) ? $config->get('content_types') : [],
            '#required' => TRUE,
            ];

        /*******************
         * Submit
         ***************/

        $form['actions']['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Save Configuration'),
            '#button_type' => 'primary',
            '#attributes' =>[
                'class' => [
                    'btn-primary',
                ],
            ],
        ];

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        $config = $this->config('fanshawe_course_interest.settings');
        $config->set('content_types', array_filter($form_state->getValue('content_types')));
        $config->save();
    }
}