import React from 'react'
      import FeatureHeader from '../organisms/FeatureHeader'
      import SearchAndSortBar from '../molecules/SearchAndSortBar'
      import EntityTable from '../organisms/EntityTable'
      import PipelineBoard from '../organisms/PipelineBoard'
      import FeatureModal from '../organisms/FeatureModal'

      const MainFeatureTemplate = ({
        view,
        data,
        loading,
        error,
        searchTerm,
        onSearchChange,
        sortField,
        onSortFieldChange,
        sortDirection,
        onSortDirectionToggle,
        sortOptions,
        onAddClick,
        showModal,
        editingItem,
        formData,
        setFormData,
        handleSubmit,
        resetForm,
        dealStages,
        activityTypes,
        handleDelete,
        handleEdit,
        handleStageChange
      }) => {
        return (
          &lt;div className="space-y-6"&gt;
            {/* Header */}
            &lt;FeatureHeader
              title={view}
              description={`Manage your ${view} effectively`}
              onAddClick={onAddClick}
              addButtonLabel={`Add ${view.slice(0, -1)}`}
            /&gt;

            {/* Search and Filters */}
            &lt;SearchAndSortBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              sortField={sortField}
              onSortFieldChange={onSortFieldChange}
              sortDirection={sortDirection}
              onSortDirectionToggle={onSortDirectionToggle}
              sortOptions={sortOptions}
              view={view}
            /&gt;

            {/* Content */}
            {view === 'deals' ? (
              &lt;PipelineBoard
                data={data}
                dealStages={dealStages}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                onAddClick={onAddClick}
              /&gt;
            ) : (
              &lt;EntityTable
                data={data}
                view={view}
                dealStages={dealStages}
                handleStageChange={handleStageChange}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                onAddClick={onAddClick}
              /&gt;
            )}

            {/* Modal */}
            &lt;FeatureModal
              showModal={showModal}
              view={view}
              editingItem={editingItem}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
              dealStages={dealStages}
              activityTypes={activityTypes}
            /&gt;
          &lt;/div&gt;
        )
      }

      export default MainFeatureTemplate