<?php

namespace Drupal\fanshawe_course_interest\Form;
// Doesn't require the src directory

use Drupal\Core\Database\Connection;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\Messenger;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Implements the Course Interst Form
 */

 Class CourseInterestForm extends FormBase {

    /**
   * Returns the current primary database.
   *
   * @var \Drupal\Core\Database\Connection
   */
    protected $databaseConnection;



    /**
     * Stores runtime messages sent out to individual users on the page.
     * 
     * @var \Drupal\Core\Messenger\Messenger
     */

    protected $messenger;

     /**
      * {@inheritdoc}
      */

    public function __construct(
        Connection $database_connection,
        Messenger $messenger
    ) {
        $this->databaseConnection = $database_connection;
        $this->messenger = $messenger;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(
        ContainerInterface $container) {
        return new static(
            $container->get('database'),
            $container->get('messenger')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'Fanshawe_course_interest_form';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        /**********************************
         * Email address
         */

        $form['email'] = [
            '#type' => 'email',
            '#title' => $this->t('Email address'),
            '#description' => $this->t(
                'We will send you deails about the 
                Course to the email you provide.'
            ),
            '#required' => TRUE,
        ];

        /*******************
         * Submit
         ***************/

        $form['actions']['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Submit'),
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
    public function validateForm(array &$form, FormStateInterface $form_state) {
        $email = $form_state->getValue('email');
        // ksm($form_state, $email);
        preg_match('/.*@fanshaweonline\.ca/', $email, $matches);

        if (empty($matches)) {
            $form_state->setErrorByName('email', $this->t(
                'Please specify a Fanshawe Student email ending in<em>@fanshaweonline.ca</em>'
            ));
        }
    }

    public function submitForm(array &$form, FormStateInterface $form_state) {
        $this->messenger->addStatus($this->t("it's working, it's working"));

        $form_state_values = $form_state->getValues();
        if (
        //   isset($form_state_values['nid']) &&
        //   !empty($form_state_values['nid']) &&
        isset($form_state_values['email']) &&
        !empty($form_state_values['email'])
        ) {
        $this->databaseConnection->insert('fanshawe_course_interest_list')
        ->fields([
        //   'nid' => $form_state->getValue('nid'),
          'mail' => $form_state->getValue('email'),
          'created' => time(),
        ])
        ->execute();
      $this->messenger->addStatus($this->t('Thank you, you have been added to the interest list.'));
    }

    }

}